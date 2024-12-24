import { Router } from "express";
import { userLoginValidator, userRegisterValidator } from "../validators/userRegisterValidator";
import { loginUser, registerUser } from "../controllers/auth";
import { validate } from "../validators/validate";

export const authRouter = Router();

authRouter.route("/register").post(userRegisterValidator(), validate, registerUser);
authRouter.route("/login").post(userLoginValidator(), validate, loginUser);