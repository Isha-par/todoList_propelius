import { User } from "../models/user";
import { ApiError } from "../utils/apiError";
import jwt from 'jsonwebtoken';
import { asyncHandler } from "../validators/asyncHandler";
import { NextFunction, Response } from "express";
import { Request } from "../request";

export const verifyJWT = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

      // console.log("here");
      
      const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

        // console.log(token);
        
  
      if (!token) {
        throw new ApiError(401, 'Unauthorized request');
      }
  
      try {
        const decodedToken = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as string
        ) as jwt.JwtPayload;
  
        const user = await User.findById(decodedToken?._id)
          .select('-password');

        // console.log(user, "######################")
  
        if (!user) {
          throw new ApiError(401, 'Invalid access token');
        }
  
        req.user = user;
        next();
      } catch (error) {
        throw new ApiError(401, 'Invalid access token');
      }
    }
  );