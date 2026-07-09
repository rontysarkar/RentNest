import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["TENANT","LANDLORD"],{ error: "Role must be either LANDLORD or TENANT" }).optional(),
  bio:z.string().min(1,"Bio cannot be empty").optional(),
  profilePhoto:z.string().optional()
});

export const loginUserSchema = z.object({
  email:z.email("Invalid email format"),
  password:z.string().min(1,"Password field are empty"),
})



export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  // email: z.email("Invalid email format").optional(),
  // role: z.enum(["TENANT","LANDLORD"],{ error: "Role must be either LANDLORD or TENANT" }).optional(),
  bio:z.string().min(1,"Bio cannot be empty").optional(),
  profilePhoto:z.string().optional()
});

export type TRegisterPayload = z.infer<typeof registerUserSchema>;
export type TLoginPayload = z.infer<typeof loginUserSchema>
export type TUpdatePayload = z.infer<typeof updateProfileSchema>
