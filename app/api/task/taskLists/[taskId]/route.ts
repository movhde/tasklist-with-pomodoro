import { readDB, writeDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Task, TaskCategory, Subtask } from "@/types/task";
import { NextResponse } from "next/server";

function isValidDateString(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await params;

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
    const taskIndex = db.tasks.findIndex(
      (t: Task) => t.id === taskId && t.userId === payload.id,
    );
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      title,
      description,
      completed,
      dueDate,
      estimatedDuration,
      categoryId,
      subtasks,
    } = body;

    const updatedTask = { ...db.tasks[taskIndex] };

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json(
          { error: "Title must be a non-empty string" },
          { status: 400 },
        );
      }
      updatedTask.title = title.trim();
    }

    if (description !== undefined) {
      updatedTask.description =
        description === null ? null : String(description);
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return NextResponse.json(
          { error: "completed must be a boolean" },
          { status: 400 },
        );
      }
      updatedTask.completed = completed;
    }

    if (dueDate !== undefined) {
      if (dueDate !== null && !isValidDateString(dueDate)) {
        return NextResponse.json(
          { error: "Invalid dueDate format. Use ISO 8601 date string" },
          { status: 400 },
        );
      }
      updatedTask.dueDate = dueDate;
    }

    if (estimatedDuration !== undefined) {
      if (estimatedDuration !== null && typeof estimatedDuration !== "number") {
        return NextResponse.json(
          { error: "estimatedDuration must be a number or null" },
          { status: 400 },
        );
      }
      updatedTask.estimatedDuration = estimatedDuration;
    }

    if (categoryId !== undefined) {
      if (categoryId !== null && categoryId.trim() !== "") {
        const categoryExists = db.categories?.some(
          (c: TaskCategory) => c.id === categoryId,
        );
        if (!categoryExists) {
          return NextResponse.json(
            { error: "Category not found" },
            { status: 400 },
          );
        }
        updatedTask.categoryId = categoryId;
      } else {
        updatedTask.categoryId = null;
      }
    }

    if (subtasks !== undefined) {
      if (!Array.isArray(subtasks)) {
        return NextResponse.json(
          { error: "subtasks must be an array" },
          { status: 400 },
        );
      }
      const validatedSubtasks: Subtask[] = [];
      for (const st of subtasks) {
        if (!st.title || typeof st.title !== "string") {
          return NextResponse.json(
            { error: "Each subtask must have a title string" },
            { status: 400 },
          );
        }
        validatedSubtasks.push({
          id: st.id || crypto.randomUUID(),
          title: st.title.trim(),
          estimatedDuration:
            typeof st.estimatedDuration === "number"
              ? st.estimatedDuration
              : null,
          createdAt: st.createdAt || new Date().toISOString(),
          completed: st.completed === true,
        });
      }
      updatedTask.subtasks = validatedSubtasks;
    }

    db.tasks[taskIndex] = updatedTask;
    writeDB(db);

    const category = db.categories?.find(
      (c: TaskCategory) => c.id === updatedTask.categoryId,
    );
    const taskWithCategory = { ...updatedTask, category: category || null };
    return NextResponse.json(taskWithCategory);
  } catch (error) {
    console.error("Error in PATCH /api/task/taskLists/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await params;

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
    const taskIndex = db.tasks.findIndex(
      (t: Task) => t.id === taskId && t.userId === payload.id,
    );
    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    db.tasks.splice(taskIndex, 1);
    writeDB(db);

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/task/taskLists/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  try {
    const { taskId } = await params;

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
    const task = db.tasks.find(
      (t: Task) => t.id === taskId && t.userId === payload.id,
    );
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const category = db.categories?.find(
      (c: TaskCategory) => c.id === task.categoryId,
    );
    const taskWithCategory = { ...task, category: category || null };
    return NextResponse.json(taskWithCategory);
  } catch (error) {
    console.error("Error in GET /api/task/taskLists/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
