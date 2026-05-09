import { NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";
import { readDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = verifyToken(token);

    const db = readDB();

    const user = db.users.find((user: any) => user.id === decoded.id);

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "invalid token" }, { status: 401 });
  }
}
