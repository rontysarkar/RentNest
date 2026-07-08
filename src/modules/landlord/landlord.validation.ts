import z from "zod";

export const createPropertySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  price: z.number().positive("Price must be a positive number"),
  location: z.string().min(1, "Location cannot be empty"),
  status: z.enum(["AVAILABLE", "RENTED"]).optional(),
  amenities: z.string().min(1, "amenities cannot be empty").optional(),
  description: z.string().min(1, "Description cannot be empty"),
  categoryId: z.string().min(1, "CategoryId cannot be empty"),
});

export const updatePropertySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  location: z.string().min(1, "Location cannot be empty").optional(),
  status: z.enum(["AVAILABLE", "RENTED"]).optional().optional(),
  amenities: z.string().min(1, "amenities cannot be empty").optional(),
  description: z.string().min(1, "Description cannot be empty").optional(),
  categoryId: z.string().min(1, "CategoryId cannot be empty").optional(),
});

export type TCreatePropertyPayload = z.infer<typeof createPropertySchema>;
export type TUpdatePropertyPayload = z.infer<typeof updatePropertySchema>
