import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";
import { asyncHandler } from "../validators/asyncHandler";
import cron from "node-cron";
import { Todo } from "../models/todo";
import { User } from "../models/user";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ishapatel2021@gmail.com",
    pass: config.emailPass,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: '"Todo App" <ishapatel2021@example.com>',
    to,
    subject,
    text,
  });

  console.log("Email send Successfully!");
};

export const scheduleTaskEmails = async () => {
  console.log("function called");

  // Schedule cron job to check tasks every minute
  cron.schedule("* * * * *", async () => {
    try {
      console.log("crons jobs");
      const currentTime = new Date();
      const currentTimeInUTC = new Date(
        currentTime.getTime() - 5.5 * 60 * 60 * 1000
      );

      console.log("Current Time (in UTC): ", currentTimeInUTC);

      // Find tasks that have a reminder time or due date that matches the current time
      const todos = await Todo.find({
        $or: [
          { reminderTime: { $lte: currentTimeInUTC }, isCompleted: false },
          { dueDate: { $lte: currentTimeInUTC }, isCompleted: false },
        ],
      });

      console.log(todos, "$$$$$$$$$$");

      for (const todo of todos) {
        // Fetch user details using userId from Task model
        const user = await User.findById(todo.userId);
        if (!user) {
          console.log(`User not found for task: ${todo.title}`);
          continue; // Skip if user not found
        }

        let subject = "";
        let text = "";

        console.log("here");

        if (
          todo.reminderTime <= currentTimeInUTC &&
          todo.reminderTime > new Date(currentTimeInUTC.getTime() - 60000)
        ) {
          console.log("#############");
          subject = "Reminder: Task Due Soon";
          text = `This is a reminder for your task: ${todo.title}. It is due soon.`;
        } else if (
          todo.dueDate <= currentTimeInUTC &&
          todo.dueDate > new Date(currentTimeInUTC.getTime() - 60000)
        ) {
          console.log("$$$$$$$$$$$$$");
          subject = "Task Due Now";
          text = `Your task "${todo.title}" is due now. Please complete it.`;
        }

        if (subject && text) {
          // Send email notification
          sendEmail(user.email, subject, text); // Use user's email
          console.log(`Email sent to ${user.email} for task: ${todo.title}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export const testSendEmail = async () => {
  const dateInPast = new Date("2024-12-24T07:00:00.000Z"); // A date 35 minutes before 7:35 AM UTC
  console.log("Date in the Past (UTC):", dateInPast);

  //add any dummy id here.
  const todo = await Todo.findOne({
    _id: "676a4f80b2c01d47fe35e435", // Replace with your actual Todo ID if necessary
  });

  if (todo) {
    let subject = "Test";
    let text = "Test email reminder time";
    await sendEmail("ishapatel2021@gmail.com", subject, text);
  } 
};

// testSendEmail();
