import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catch-async";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { prisma } from "../lib/prisma";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { jwtUtils } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }
  }
}

export const auth = (...requiredRole: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      throw new Error("Access token is messing, Please login in again");
    }
    const payload = jwtUtils.verifyToken(accessToken,config.jwt_access_token_secret);
    
    const { email, role, id, name } = payload as JwtPayload;

    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error("Your are not authorized to access this resource");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error("User not found with this token");
    }

    if (user.status === "BANNED") {
      throw new Error(
        "Your account has been suspended. Please contact support.",
      );
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  });
};
