import { NextFunction, Request, Response } from "express";
import { login, refreshAccessToken, register } from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registedUser = await register(req.body);

    res.status(200).json({ message: "Success", data: registedUser });
  } catch (error) {
    return next({ type: "api", error });
  }
};

export const signin = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await login(username, password);

    resp.cookie("refreshToken", refreshToken, {
      // httpOnly: true,
      sameSite: "strict",
      path: "/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return resp.status(200).json({
      message: "Success",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return next({ type: "api", error });
  }
};

export const refreshToken = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization;
    console.log("accessToken", accessToken);

    const refreshToken = req.cookies.refreshToken;

    const newAccessToken = await refreshAccessToken(accessToken, refreshToken);
    return resp
      .status(200)
      .json({ message: "Success", accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh Token failed:", error);
    return next({ type: "api", error });
  }
};
