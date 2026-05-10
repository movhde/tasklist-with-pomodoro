import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readDB, writeDB } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import type {
  SignupRequest,
  AuthResponse,
  ErrorResponse,
  User,
} from "@/types/auth";

export async function POST(req: Request) {
  try {
    const body: SignupRequest = await req.json();
    const { email, password, confirmPassword } = body;

    if (!email || !password || !confirmPassword) {
      return NextResponse.json<ErrorResponse>(
        { message: "Email, password and confirmPassword are required" },
        { status: 400 },
      );
    }
    if (password !== confirmPassword) {
      return NextResponse.json<ErrorResponse>(
        { message: "Passwords do not match" },
        { status: 400 },
      );
    }
    if (password.length < 5) {
      return NextResponse.json<ErrorResponse>(
        { message: "Password must be at least 5 characters" },
        { status: 400 },
      );
    }

    const db = readDB();
    const existingUser = db.users.find((user: User) => user.email === email);

    if (existingUser) {
      return NextResponse.json<ErrorResponse>(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    writeDB(db);

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
    });

    return NextResponse.json<AuthResponse>({
      user: {
        id: newUser.id,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json<ErrorResponse>(
      { message: "Server error" },
      { status: 500 },
    );
  }
}
