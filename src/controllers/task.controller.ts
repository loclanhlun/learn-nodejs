import { Request, Response, NextFunction } from "express";
import { getAllTasks, createTask } from "../services/task.service";

export const getTasks = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const tasks = await getAllTasks();
    resp.status(200).json({ message: "Success", data: tasks });
  } catch (error) {
    return next({ type: "api", error });
  }
};

export const createNewTask = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    await createTask(req.body);
    resp.status(200).json({ message: "Success" });
  } catch (error) {
    return next({ type: "api", error });
  }
};
