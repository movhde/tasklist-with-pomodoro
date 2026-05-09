import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { readDB } from "@/lib/db";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const db = readDB();

    const user = db.users.find((user: any) => user.email === email);

    if (!user) {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
