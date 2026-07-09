import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { validate } from "../../middleware/validate";
import { updateUserStatusSchema } from "./admin.validation";


const router = Router();

router.get('/users',auth(UserRole.ADMIN),adminController.getAllUser);
router.patch('/users/:id',auth(UserRole.ADMIN),validate(updateUserStatusSchema),adminController.updateUserStatus);


export const adminRoutes = router;