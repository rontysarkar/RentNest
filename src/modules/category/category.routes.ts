import { Router } from "express";
import { categoryController } from "./category.controller";
import { validate } from "../../middleware/validate";
import { createCategorySchema } from "./category.validation";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";


const router = Router();

router.post('/',auth(UserRole.ADMIN),validate(createCategorySchema),categoryController.createCategory);

// public
router.get('/',categoryController.getAllCategory);


export const categoryRoutes = router;