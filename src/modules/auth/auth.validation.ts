import { z } from "zod";

export const registerInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["TENANT","LANDLORD"]).optional(),
});

export type IUserPayload = z.infer<typeof registerInputSchema>;
