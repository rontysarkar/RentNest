import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUserPayload } from "./auth.validation";
import { config } from "../../config";

const registerUser = async (payload: IUserPayload) => {
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

export const authService = {
  registerUser,
};
