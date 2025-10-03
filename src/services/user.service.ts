import { User } from "../entities/user.entity";
import { NewUserRequest } from "../models/user.model";
import { dataSource } from "../config/db";

const userRepository = dataSource.getMongoRepository(User);

export const getAllUsers = async () => {
  return await userRepository.find();
};

export const createUser = async (payload: NewUserRequest) => {
  const newUser = new User(
    payload.firstName,
    payload.lastName,
    payload.username,
    payload.password
  );

  return await userRepository.save(newUser);
};
