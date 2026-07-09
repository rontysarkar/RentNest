import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { validate } from "../../middleware/validate";
import { createPaymentSchema } from "./payments.validation";
import { paymentController } from "./payments.controller";


const router = Router();

router.post('/create',auth(UserRole.TENANT),validate(createPaymentSchema),paymentController.createPayment)
router.post('/webhook',paymentController.handleWebhook)

export const paymentRoutes = router;