import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["TENANT","LANDLORD"]).optional(),
});

export const loginUserSchema = z.object({
  email:z.email("Invalid email format"),
  password:z.string().min(1,"Password field are empty"),
})

export type TRegisterPayload = z.infer<typeof registerUserSchema>;
export type TLoginPayload = z.infer<typeof loginUserSchema>
