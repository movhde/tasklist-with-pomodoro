import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { TaskCategory } from "@/types/task";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const db = readDB();
    const userCategories: TaskCategory[] = db.categories?.filter(
      (c: TaskCategory) => c.userId === payload.id,
    );

    return NextResponse.json(userCategories);
  } catch (error) {
    console.error("Error in GET /api/task/categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
