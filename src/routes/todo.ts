import { Router } from "express";
import { validate } from "../validators/validate";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  toggleTodoDoneStatus,
  //   toggleTodoDoneStatus,
  updateTodo,
} from "../controllers/todo";
import { mongoIdPathVariableValidator } from "../validators/mongoId.validate";
import { verifyJWT } from "../middlerwares/auth";

export const todoRouter = Router();

//user should be authenticated in order to use todo list.
todoRouter.use(verifyJWT);

todoRouter.route("/").post(validate, createTodo).get(getAllTodos);

todoRouter
  .route("/:todoId")
  .get(mongoIdPathVariableValidator("todoId"), validate, getTodoById)
  .patch(mongoIdPathVariableValidator("todoId"), validate, updateTodo)
  .delete(mongoIdPathVariableValidator("todoId"), validate, deleteTodo);

todoRouter
  .route("/toggle/status/:todoId")
  .patch(
    mongoIdPathVariableValidator("todoId"),
    validate,
    toggleTodoDoneStatus
  );

export default todoRouter;
