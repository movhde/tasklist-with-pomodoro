import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export const generateToken = (payload: any) => {
  return jwt.sign(payload, secret, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
