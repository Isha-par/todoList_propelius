import { Request as expressRequest } from "express";
import { IUser } from "./models/user";

export interface Request extends expressRequest {
  user: IUser;
}
