import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export const isAuth = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token || (token && !token.startsWith("Bearer "))) {
    return resp.status(401).json("Unauthorized");
  }

  token = token.replace("Bearer ", "");

  console.log("TOKEN=======>", token);

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY ?? "";
  const verified = await verifyToken(token, accessTokenSecret);

  if (!verified) {
    return resp.status(401).json("Unauthorized");
  }

  return next();
};
