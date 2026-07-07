import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/validate";
import { registerInputSchema } from "./auth.validation";


const router = Router();

router.post("/register", validate(registerInputSchema), authController.registerUser);
// router.post('/login')

export const authRoutes = router;
