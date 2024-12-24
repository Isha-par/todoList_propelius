import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import mongoose from "mongoose";
import { errorHandler } from "./middlerwares/error";
import todoRouter from "./routes/todo";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/todoList-propelius")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("ToDoList-Propelius")
});

app.use('/auth', authRouter)
app.use('/todo', todoRouter)

app.use(errorHandler);

export default app;
