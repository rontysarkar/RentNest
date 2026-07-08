import { Router } from "express";
import { categoryController } from "./category.controller";
import { validate } from "../../middleware/validate";
import { createCategorySchema } from "./category.validation";


const router = Router();

router.post('/',validate(createCategorySchema),categoryController.createCategory);

// public
router.get('/',categoryController.getAllCategory);


export const categoryRoutes = router;