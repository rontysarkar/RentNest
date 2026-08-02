import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { validate } from "../../middleware/validate";
import { createReviewSchema } from "./review.validation";
import { reviewController } from "./review.controller";

const router = Router();

router.post(
  "/",
  auth(UserRole.TENANT),
  validate(createReviewSchema),
  reviewController.createReview,
);
router.get("/", reviewController.getReviews);
router.get("/tenant-reviews", auth(UserRole.TENANT), reviewController.getReviews);

export const reviewRoutes = router;
