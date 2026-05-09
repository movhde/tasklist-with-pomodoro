import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { readDB, writeDB } from "@/lib/db";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "email and password required" },
        { status: 400 },
      );
    }

    const db = readDB();

    const existingUser = db.users.find((user: any) => user.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
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

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
