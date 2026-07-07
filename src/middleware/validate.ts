import { Request, Response, NextFunction } from "express";
import { ZodType,z  } from "zod";


export const validate = (schema: ZodType ) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errorDetails: z.flattenError(result.error).fieldErrors
      });
    }

    req.body = result.data; 
    next();
  };
};

