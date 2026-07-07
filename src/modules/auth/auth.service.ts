import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { TUserLoginPayload, TUserRegisterPayload } from "./auth.validation";
import { config } from "../../config";
import jwt, { SignOptions } from "jsonwebtoken";
import { jwtUtils } from "../../utils/jwt";

const registerUser = async (payload: TUserRegisterPayload) => {
  const { email, password } = payload;
  const isExistsUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isExistsUser) {
    throw new Error("Email Already Exists");
  }

  const hashPassword = await bcrypt.hash(password, Number(config.bcrypt_salt));

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const loginUser = async (payload: TUserLoginPayload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Incorrect email or password");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_token_secret,
    config.jwt_access_token_expires_in,
  );
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_token_secret,
    config.jwt_refresh_token_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  registerUser,
  loginUser,
};
