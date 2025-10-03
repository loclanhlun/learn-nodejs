import { NewUserRequest } from "../models/user.model";
import { createUser } from "./user.service";
import { User } from "../entities/user.entity";
import { dataSource } from "../config/db";
import bcrypt from "bcrypt";
import { verifyToken, generateAccessToken } from "../utils/jwt.util";
import type { StringValue } from "ms";
import dotenv from "dotenv";
dotenv.config();

const userRepository = dataSource.getMongoRepository(User);
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY ?? "";
const ACCESS_TOKEN_EXPIRE_TIME =
  (process.env.ACCESS_TOKEN_EXPIRE_TIME as StringValue) ||
  ("0ms" as StringValue);

export const register = async (payload: NewUserRequest) => {
  const existingUser = await userRepository.findOneBy({
    username: payload.username.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }
  const passwordEncrypted = await bcrypt.hashSync(payload.password, 10);
  payload.password = passwordEncrypted;

  return await createUser(payload);
};

export const login = async (username: string, password: string) => {
  const user = await userRepository.findOneBy({
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  //generate token:
  const dataForAccessToken = {
    username: user.username,
  };

  const accessToken = await generateAccessToken(
    dataForAccessToken,
    ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRE_TIME
  );

  if (!accessToken) {
    throw new Error("Login Failed");
  }

  let refreshToken = await generateAccessToken(
    dataForAccessToken,
    ACCESS_TOKEN_SECRET_KEY,
    "7Days"
  );

  if (!user.refreshToken) {
    await userRepository.update(
      { username: user.username },
      { refreshToken: refreshToken }
    );
  } else {
    refreshToken = user.refreshToken;
  }

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (
  accessToken: string | undefined,
  refreshTokenFromHeader: string
) => {
  if (!accessToken) {
    throw new Error("Access Token not found!");
  }

  if (!refreshTokenFromHeader) {
    throw new Error("Refresh Token not found!");
  }

  accessToken = accessToken.replace("Bearer ", "");

  const decoded = (await verifyToken(accessToken, ACCESS_TOKEN_SECRET_KEY)) as {
    username: string;
  };
  console.log("decoded=>>", decoded);

  if (!decoded || !decoded.username) {
    throw new Error("Invalid Token");
  }

  const username = decoded.username;

  const user = await userRepository.findOneBy({ username: username });

  if (!user) {
    throw new Error("User not found!");
  }

  if (refreshTokenFromHeader !== user.refreshToken) {
    throw new Error("Refresh Token is invalid");
  }

  const dataForAccessToken = {
    username,
  };

  const newAccessToken = await generateAccessToken(
    dataForAccessToken,
    ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXPIRE_TIME
  );

  if (!newAccessToken) {
    throw new Error("Create Access Token failed!");
  }

  return newAccessToken;
};
