import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rental-request.controller";

const router = Router();

router.post('/:id',auth(UserRole.TENANT),rentalRequestController.createRentalRequest);
router.get('/',auth(UserRole.TENANT),rentalRequestController.getMyRentalRequests);
router.get('/:id',rentalRequestController.getSingleRentalRequest);

export const rentalRoutes = router;