import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readDB } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import type { LoginRequest, AuthResponse, ErrorResponse } from "@/types/auth";

export async function POST(req: Request) {
  try {
    const body: LoginRequest = await req.json();
    const { email, password } = body;

    const db = readDB();
    const user = db.users.find((user) => user.email === email);

    if (!user) {
      return NextResponse.json<ErrorResponse>(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json<ErrorResponse>(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return NextResponse.json<AuthResponse>({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json<ErrorResponse>(
      { message: "Server error" },
      { status: 500 },
    );
  }
}
