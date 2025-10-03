import { Request, Response } from "express";
import { getAllUsers, createUser } from "../services/user.service";

export const getUser = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  //map data

  const response = {
    message: "Success",
    data: users,
  };
  res.json(response);
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    await createUser(req.body);
    res.status(200).json({ message: "Success" });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
