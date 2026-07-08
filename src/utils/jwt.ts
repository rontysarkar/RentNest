import { UserRole } from "../../generated/prisma/enums";
import jwt, { SignOptions } from "jsonwebtoken";

type TJwtPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn: expiresIn } as SignOptions);
};

const verifyToken = (token:string,secret:string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token or expires token");
  }
};

export const jwtUtils = {
  createToken,
  verifyToken
};
