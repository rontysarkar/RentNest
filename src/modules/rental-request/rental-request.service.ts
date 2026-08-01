import { prisma } from "../../lib/prisma";

const createRentalRequest = async (tenantId: string, propertyId: string) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });

  if (!property) {
    throw new Error("Property Not Found");
  }

  if (property.status === "RENTED") {
    throw new Error("This property is already rented and no longer available.");
  }

  const existingRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
    },
  });

  if (existingRequest) {
    throw new Error(
      "You have already sent a rental request for this property.",
    );
  }

  const result = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId,
    },
  });

  return result;
};

const getMyRentalRequests = async (tenantId: string) => {
  const result = await prisma.rentalRequest.findMany({
    where: {
      tenantId,
    },
    include: {
      property: {
        select: {
          title: true,
          price: true,
          status:true,
          landlord: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!result) {
    throw new Error("Not Rental Request Found");
  }

  return result;
};

const getSingleRentalRequest = async (id: string, tenantId: string) => {
  const result = await prisma.rentalRequest.findUnique({
    where: {
      id,
      tenantId,
    },
    include: {
      property: true,
    },
  });

  if (!result) {
    throw new Error("Your only access your own rental request");
  }

  return result;
};

const getPropertyRentalRequestStatus = async (
  propertyId: string,
  tenantId: string,
) => {
  const result = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!result) {
    throw new Error("Request Not Found");
  }
  return result;
};

const getTenantDashboardStats = async (tenantId: string) => {
  const totalRequests = await prisma.rentalRequest.count({
    where: {
      tenantId,
    },
  });

  const activeRentals = await prisma.rentalRequest.count({
    where: {
      tenantId,
      status: "APPROVED",
    },
  });

  const pendingRequests = await prisma.rentalRequest.count({
    where: {
      tenantId,
      status: "PENDING",
    },
  });

  const paymentsResult = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      status: "COMPLETED",
      rentalRequest: {
        tenantId,
      },
    },
  });

  const totalPayments = paymentsResult._sum.amount || 0;

  return {
    totalRequests,
    activeRentals,
    pendingRequests,
    totalPayments,
  };
};

export const rentalRequestService = {
  createRentalRequest,
  getMyRentalRequests,
  getSingleRentalRequest,
  getPropertyRentalRequestStatus,
  getTenantDashboardStats,
};
