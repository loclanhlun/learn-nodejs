import express from "express";
import { errorHandler } from "./middlewares/error.middlewares";
import userRouter from "./routers/user.route";
import taskRouter from "./routers/task.route";
import authRouter from "./routers/auth.route";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
