import { body, param, ValidationChain } from "express-validator";

const userRegisterValidator = (): ValidationChain[] => {
  return [
    body("email")
      .trim() // TO Remove whitespace characters
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const userLoginValidator = (): ValidationChain[] => {
  return [
    body("email")
      .exists({ checkFalsy: true })
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export { userLoginValidator, userRegisterValidator };
