import { body } from "express-validator";

export const createUserSchema = [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("firstName is required and must be a non-empty string"),
  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("lastName is required and must be a non-empty string"),
  body("username")
    .isString()
    .notEmpty()
    .withMessage("username is required and must be a non-empty string"),
  body("password")
    .isString()
    .notEmpty()
    .withMessage("password is required and must be a non-empty string"),
];
