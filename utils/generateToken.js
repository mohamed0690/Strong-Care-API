import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload) =>
  jwt.sign(payload, process.env.TOKEN_KEY);

export const generateTokenExpiredAfterTenMins = (payload) =>
  jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: 600,
  });
