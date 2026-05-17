import { readDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Task, TaskCategory, TaskWithCategory } from "@/types/task";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

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

    let userTasks: Task[] = db.tasks.filter(
      (t: Task) => t.userId === payload.id,
    );

    const categoryId = searchParams.get("categoryId");
    if (categoryId) {
      userTasks = userTasks.filter((t: Task) => t.categoryId === categoryId);
    }

    const taskWithCategory: TaskWithCategory[] = userTasks.map((task: Task) => {
      const category = db.categories?.find(
        (c: TaskCategory) => c.id === task.categoryId,
      );
      return { ...task, category: category || null };
    });

    return NextResponse.json(taskWithCategory);
  } catch (error) {
    console.error("Error in GET /api/tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
