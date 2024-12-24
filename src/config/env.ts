import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoList-propelius",
  jwtSecret: process.env.ACCESS_TOKEN_SECRET,
  secretToken: process.env.ACCESS_TOKEN_SECRET,
  expiryToken : process.env.ACCESS_TOKEN_EXPIRY,
  emailPass : process.env.MAIL_PASS,
};
