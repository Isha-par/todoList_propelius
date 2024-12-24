import mongoose, { Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  dueDate: Date;
  reminderTime: Date;
  userId: mongoose.Schema.Types.ObjectId;
  isCompleted: string;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    dueDate: { type: Date, required: true },
    reminderTime: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    isComplete: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
