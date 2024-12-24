import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error: ApiError;

  // Check if the error is an instance of ApiError class
  if (err instanceof ApiError) {
    error = err;
  } else {
    // creating a default error response
    const statusCode =
      (err as any).statusCode || err instanceof mongoose.Error ? 400 : 500;

    const message = err.message || "Something went wrong";
    error = new ApiError(
      statusCode,
      message,
      (err as any)?.errors || [],
    );
  }

  // Build the error response
  const response = {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
};

  res.status(error.statusCode).json(response);
};

export { errorHandler };