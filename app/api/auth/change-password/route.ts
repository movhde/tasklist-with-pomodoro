import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { verifyToken } from "@/lib/jwt";
import { readDB, writeDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);

    const body = await req.json();
    const { currentPassword, newPassword, confirmPassword } = body ?? {};

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return NextResponse.json(
        { message: "invalid payload" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 },
      );
    }

    const db = readDB();
    const userIndex = db.users.findIndex((u: any) => u.id === decoded.id);
    if (userIndex === -1) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const user = db.users[userIndex];

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 },
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    db.users[userIndex] = { ...user, password: hashed };
    writeDB(db);

    return NextResponse.json({ message: "Password updated" });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

