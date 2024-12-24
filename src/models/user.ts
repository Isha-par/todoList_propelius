import mongoose, {
  Schema,
  Document,
  Date,
  CallbackWithoutResultAndOptionalError,
} from "mongoose";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password
userSchema.pre<IUser>(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) return next(); // Only hash the password if it has been modified

    try {
      this.password = await bcrypt.hash(this.password, 10); // Hashing the password
      next();
    } catch (err) {
      next(err as mongoose.CallbackError); // Pass the error to the next middleware
    }
  }
);

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model<IUser>("users", userSchema);
