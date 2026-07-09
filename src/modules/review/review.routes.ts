import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { validate } from "../../middleware/validate";
import { createReviewSchema } from "./review.validation";
import { reviewController } from "./review.controller";

const router = Router();

router.post('/',auth(UserRole.TENANT),validate(createReviewSchema),reviewController.createReview);


export const reviewRoutes = router;