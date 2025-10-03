import { body } from "express-validator";

export const createTaskSchema = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("firstName is required and must be a non-empty string"),
  body("description").isString().withMessage("description must be a string"),
  body("progress")
    .isIn(["To Do", "In Progress", "Done"])
    .withMessage('progress must be one of "To Do", "In Progress", or "Done"'),
];
