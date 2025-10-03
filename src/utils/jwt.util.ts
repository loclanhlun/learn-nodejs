import jwt, { Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

export const generateAccessToken = async (
  payload: any,
  secretKey: Secret,
  expireTime: StringValue
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secretKey,
      {
        algorithm: "HS256",
        expiresIn: expireTime,
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};

export const verifyToken = async (token: string, secretKey: Secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      secretKey,
      { algorithms: ["HS256"] },
      (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      }
    );
  });
};
