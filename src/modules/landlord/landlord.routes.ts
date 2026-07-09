import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { validate } from "../../middleware/validate";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { createPropertySchema, requestStatusSchema, updatePropertySchema } from "./landlord.validation";



const router  = Router();




// only for landlord

router.post('/properties',validate(createPropertySchema),auth(UserRole.LANDLORD),landlordController.createProperty);
router.put('/properties/:id',validate(updatePropertySchema),auth(UserRole.LANDLORD),landlordController.updateProperty);
router.delete('/properties/:id',auth(UserRole.LANDLORD),landlordController.deleteProperty);

router.get('/requests',auth(UserRole.LANDLORD),landlordController.getRequestsByLandlordId);
router.patch('/requests/:id',validate(requestStatusSchema),auth(UserRole.LANDLORD),landlordController.approveOrRejectRequest);

router.get('/properties',auth(UserRole.LANDLORD),landlordController.getAllPropertyByLandlordId);
router.get('/properties/:id',auth(UserRole.LANDLORD),landlordController.getPropertyByLandlordById);




export const landlordRoutes = router;