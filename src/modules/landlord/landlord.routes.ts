import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { validate } from "../../middleware/validate";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { createPropertySchema, updatePropertySchema } from "./landlord.validation";



const router  = Router();

// public
router.get('/properties',landlordController.getAllProperty);
router.get('/properties/:id',landlordController.getProperty);

// only for landlord

router.post('/properties',validate(createPropertySchema),auth(UserRole.LANDLORD),landlordController.createProperty);
router.put('/properties/:id',validate(updatePropertySchema),auth(UserRole.LANDLORD),landlordController.updateProperty);
router.delete('/properties/:id',auth(UserRole.LANDLORD),landlordController.deleteProperty);



export const landlordRoutes = router;