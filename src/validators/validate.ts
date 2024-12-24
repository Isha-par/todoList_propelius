import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { ApiError } from '../utils/apiError';

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: { [key: string]: string }[] = [];

  errors.array().map((err: ValidationError) => {
    extractedErrors.push({ [err.type]: err.msg });
  });

  // 422: Unprocessable Entity
  throw new ApiError(422, 'Received data is not valid', extractedErrors);
};
