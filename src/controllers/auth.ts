import { Response, Request } from "express";
import { IUser, User } from "../models/user";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../validators/asyncHandler";
import { ApiError } from "../utils/apiError";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role, username } = req.body;

  // Check if user with email already exists
  const existedUser = await User.findOne({
   email
  });

  if (existedUser) {
    throw new ApiResponse(409, "User with email already exists");
  }

  // Create new user
  const user = await User.create({
    email,
    password
  });

  await user.save({ validateBeforeSave: false });

  // Fetch created user without sensitive fields
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Respond with success
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered successfully.",
        { user: createdUser },
      )
    );
});

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
      throw new ApiError(400, "Username or email is required");
    }

    const user: IUser | null = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const accessToken = user.generateAccessToken();
    
    const loggedInUser = await User.findById(user._id).select(
      "-password"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, 
      
      )
      .json(
        new ApiResponse(
          200,
          "User logged in successfully",
          { user: loggedInUser, accessToken
          },
        )
      );
  }
);

export { registerUser };
