import { readDB, writeDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Task, TaskCategory, TaskWithCategory } from "@/types/task";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

function isValidDateString(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function getDateOnly(dateStr: string | null): string | null {
  if (!dateStr) return null;
  return dateStr.slice(0, 10);
}

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
    const date = searchParams.get("date");

    if (categoryId) {
      userTasks = userTasks.filter((t: Task) => t.categoryId === categoryId);
    }

    if (date) {
      const targetDate = date.slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
        return NextResponse.json(
          { error: "Invalid date format. Use YYYY-MM-DD" },
          { status: 400 },
        );
      }

      userTasks = userTasks.filter((task) => {
        if (!task.dueDate) return false;
        const taskDateOnly = getDateOnly(task.dueDate);
        return taskDateOnly === targetDate;
      });
    }

    const taskWithCategory: TaskWithCategory[] = userTasks.map((task: Task) => {
      const category = db.categories?.find(
        (c: TaskCategory) => c.id === task.categoryId,
      );
      return { ...task, category: category || null };
    });

    return NextResponse.json(taskWithCategory);
  } catch (error) {
    console.error("Error in GET /api/task/taskLists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();
    const { title, description, estimatedDuration, dueDate, categoryId } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Title is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (
      estimatedDuration !== undefined &&
      typeof estimatedDuration !== "number"
    ) {
      return NextResponse.json(
        { error: "estimatedDuration must be a number" },
        { status: 400 },
      );
    }

    if (dueDate && !isValidDateString(dueDate)) {
      return NextResponse.json(
        { error: "Invalid dueDate format. Use ISO 8601 date string" },
        { status: 400 },
      );
    }

    const db = readDB();

    const newTask: Task = {
      id: randomUUID(),
      title: title.trim(),
      description: description || null,
      completed: false,
      userId: payload.id,
      categoryId: categoryId || null,
      dueDate: dueDate || null,
      estimatedDuration: estimatedDuration || null,
      subtasks: [],
      createdAt: new Date().toISOString(),
    };

    db.tasks = db.tasks || [];
    db.tasks.push(newTask);
    writeDB(db);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/task/taskLists:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
