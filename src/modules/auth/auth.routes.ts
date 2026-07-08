import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { loginUserSchema, registerUserSchema, updateProfileSchema } from "./auth.validation";
import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";




const router = Router();

router.post("/register", validate(registerUserSchema), authController.registerUser);
router.post('/login',validate(loginUserSchema),authController.loginUser);
router.get('/me',auth(UserRole.ADMIN,UserRole.LANDLORD,UserRole.TENANT),authController.myProfile)
router.put('/profile',validate(updateProfileSchema),auth(UserRole.ADMIN,UserRole.LANDLORD,UserRole.TENANT),authController.updateProfile)

export const authRoutes = router;
