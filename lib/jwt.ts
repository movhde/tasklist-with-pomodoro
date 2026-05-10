import jwt from "jsonwebtoken";
import type { JWTPayload } from "@/types/auth";

const secret = process.env.JWT_SECRET!;

if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, secret) as JWTPayload;
};
