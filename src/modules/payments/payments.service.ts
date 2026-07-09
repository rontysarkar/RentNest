import Stripe from "stripe";
import { config } from "../../config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { PaymentStatus, propertyStatus } from "../../../generated/prisma/enums";

const createPayment = async (rentalRequestId: string, tenantId: string) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
    },
    include: {
      property: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental Request Not Found");
  }

  if (rentalRequest.tenantId !== tenantId) {
    throw new Error(
      "Unauthorized payment. You can only pay for your own rental requests.",
    );
  }

  if (rentalRequest.status !== "APPROVED") {
    throw new Error(
      "You cannot make a payment until the landlord approves your request.",
    );
  }

  if (rentalRequest.property.status !== "AVAILABLE") {
    throw new Error("This property is currently unavailable for booking.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: rentalRequest.property.title,
          },
          unit_amount: rentalRequest.property.price * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${config.clint_url}/payment/success`,
    cancel_url: `${config.clint_url}/payment/cancel`,
    metadata: {
      rentalRequestId: rentalRequest.id,
    },
  });

  await prisma.payment.upsert({
    where: {
      rentalRequestId,
    },
    create: {
      rentalRequestId: rentalRequestId,
      transactionId: session.id,
      amount: rentalRequest.property.price,
      provider: "STRIPE",
      status: "PENDING",
    },
    update: {
      transactionId: session.id,
      amount: rentalRequest.property.price,
      provider: "STRIPE",
      status: "PENDING",
    },
  });

  return { url: session.url };
};

const handleStripeWebhook = async (rawBody: Buffer, signature: string) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      config.stripe_webhook_secret as string,
    );
  } catch (error) {
    throw new Error(`Webhook signature verification failed`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const rentalRequestId = session.metadata?.rentalRequestId;

    if (rentalRequestId) {
      const existingPayment = await prisma.payment.findUnique({
        where: { rentalRequestId },
      });

      if (existingPayment && existingPayment.status === PaymentStatus.COMPLETED) {
        console.log(
          `Payment for request ${rentalRequestId} was already processed.`,
        );
        return { received: true };
      }

      const transactionPrisma = await prisma.$transaction(async (tx) => {
        const result = await tx.payment.update({
          where: { rentalRequestId },
          data: {
            status: PaymentStatus.COMPLETED,
            paidAt: new Date(),
            transactionId: session.id,
          },
          include: {
            rentalRequest: {
              select: { propertyId: true },
            },
          },
        });

        await tx.property.update({
          where: { id: result.rentalRequest.propertyId },
          data: {
            status: propertyStatus.RENTED,
          },
        });

      });
    }
  }

  return  { received: true };
};

export const paymentService = {
  createPayment,
  handleStripeWebhook,
};
