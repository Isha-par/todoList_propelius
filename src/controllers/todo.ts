import { Response } from "express";
import { Todo } from "../models/todo";
import { Request } from "../request";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../validators/asyncHandler";

export const getTodoById = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(404, "Todo does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Todo fetched successfully", todo));
});

export const createTodo = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const user = req.user;

    const { title, description, dueDate, reminderTime } = req.body;
    const todo = await Todo.create({
      title,
      description,
      userId: user._id,
      dueDate,
      reminderTime,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Todo created successfully", todo));
  }
);

export const updateTodo = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { todoId } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          title,
          description,
        },
      },
      { new: true }
    );

    if (!todo) {
      throw new ApiError(404, "Todo does not exist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Todo updated successfully", todo));
  }
);

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const todo = await Todo.findByIdAndDelete(todoId);

  if (!todo) {
    throw new ApiError(404, "Todo does not exist");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Todo deleted successfully", { deletedTodo: todo })
    );
});

export const toggleTodoDoneStatus = asyncHandler(async (req: Request, res: Response) => {

    const {todoId}= req.params;

    const getTodo = await Todo.findOne({
        _id: todoId,
        userId: req.user._id,
    });

    if(!getTodo) {
        throw new ApiError(404, "Todo does not exist");
    }

     // Toggle the isCompleted status
     getTodo.isComplete = !getTodo.isComplete;

     await getTodo.save();

     return res
      .status(200)
      .json(new ApiResponse(200, "Todo status updated successfully", getTodo));

})

export const getAllTodos = asyncHandler(async (req: Request, res: Response) => {
    const allTodos = await Todo.find({
        userId: req.user._id
    });

    return res
    .status(200)
    .json(new ApiResponse(200, "TodoList fetched successfully", allTodos));
})
