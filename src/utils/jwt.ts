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

export const jwtUtils = {
  createToken,
};
