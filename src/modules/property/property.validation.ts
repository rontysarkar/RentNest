import z from "zod";
import { PropertyWhereInput } from "../../../generated/prisma/models";
import { propertyStatus } from "../../../generated/prisma/enums";

export const querySchema = z.object({
  title: z.string().min(1, "Title cannot be empty").optional(),
  location: z.string().min(1, "Location cannot be empty").optional(),
  amenities: z.string().min(1, "amenities cannot be empty").optional(),
  searchTerm: z.string().min(1, "SearchTerm cannot be empty").optional(),
  sortBy: z.string().default("createdAt").optional(),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc").optional(),
  minPrice:z.string().optional(),
  maxPrice:z.string().optional(),
  status:z.enum(['AVAILABLE','RENTED'],{error:"status must be either AVAILABLE or RENTED"}).optional()
});

export interface IPropertyQuery extends PropertyWhereInput {
  searchTerm?: string;
  sortOrder?: string;
  sortBy?: string;
  minPrice?:string;
  maxPrice?:string;
  status?:propertyStatus;
}
