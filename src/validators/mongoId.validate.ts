import { param } from "express-validator";

// The validator function takes a string (idName) as input and returns an array of validation checks.
export const mongoIdPathVariableValidator = (idName: string) => {
  return [
    param(idName)
      .notEmpty()
      .isMongoId()
      .withMessage(`Invalid ${idName}`),
  ];
};
