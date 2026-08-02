import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { validate } from "../../middleware/validate";
import { updateUserStatusSchema } from "./admin.validation";


const router = Router();

router.get('/users',auth(UserRole.ADMIN),adminController.getAllUser);
router.patch('/users/:id',auth(UserRole.ADMIN),validate(updateUserStatusSchema),adminController.updateUserStatus);
router.get('/properties',auth(UserRole.ADMIN),adminController.getAllProperty)
router.get('/rental-requests',auth(UserRole.ADMIN),adminController.getAllRentalRequest)
router.get('/properties/:id',auth(UserRole.ADMIN),adminController.getPropertyById)
router.get('/overview',auth(UserRole.ADMIN),adminController.getAdminDashboardStats)

export const adminRoutes = router;