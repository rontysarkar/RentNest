import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rental-request.controller";
import { validate } from "../../middleware/validate";
import { createRentalRequestSchema } from "./rental-request.validation";

const router = Router();

router.post('/',validate(createRentalRequestSchema),auth(UserRole.TENANT),rentalRequestController.createRentalRequest);
router.get('/',auth(UserRole.TENANT),rentalRequestController.getMyRentalRequests);
router.get('/:id',auth(UserRole.TENANT),rentalRequestController.getSingleRentalRequest);

export const rentalRoutes = router;