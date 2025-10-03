import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err.type === "validation") {
    return res.status(400).json({
      message: "Validation failed",
      details: err.errors.map((e: any) => {
        return { [e.path]: e.msg };
      }),
    });
  }
  res.status(500).json({ error: err.message });
};
