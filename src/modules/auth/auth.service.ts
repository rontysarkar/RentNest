import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { config } from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { TLoginPayload, TRegisterPayload } from "./auth.validation";

const registerUser = async (payload: TRegisterPayload) => {
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

const loginUser = async (payload: TLoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
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


const myProfile = async(userId:string)=>{
  const user = await prisma.user.findUnique({
    where:{
      id:userId
    },
    omit:{
      password:true
    }
  })

  if(!user || user.status === 'BANNED'){
    throw new Error("User Not Found")
  }

  return user;
}

export const authService = {
  registerUser,
  loginUser,
  myProfile
  
};
