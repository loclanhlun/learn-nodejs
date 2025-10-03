import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";
import { Task } from "../entities/task.entity";

export const dataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "test-db",
  entities: [User, Task],
});
