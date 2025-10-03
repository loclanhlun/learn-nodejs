import { Task } from "../models/task.model";
import { dataSource } from "../config/db";
import { Task as TaskEntity } from "../entities/task.entity";

const taskRepository = dataSource.getMongoRepository(TaskEntity);

export const getAllTasks = async () => {
  return await taskRepository.find();
};

export const createTask = async (payload: Task) => {
  return await taskRepository.save(payload);
};
