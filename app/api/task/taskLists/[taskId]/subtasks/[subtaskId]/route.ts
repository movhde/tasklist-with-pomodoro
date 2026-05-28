import { readDB, writeDB } from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import { Subtask, Task } from "@/types/task";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ taskId: string; subtaskId: string }> },
) {
  try {
    const { taskId, subtaskId } = await params;

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { completed } = await request.json();
    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "completed must be a boolean" },
        { status: 400 },
      );
    }

    const db = readDB();
    const task = db.tasks.find(
      (t: Task) => t.id === taskId && t.userId === payload.id,
    );
    if (!task)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });

    const subtask = task.subtasks?.find((st: Subtask) => st.id === subtaskId);
    if (!subtask)
      return NextResponse.json({ error: "Subtask not found" }, { status: 404 });

    subtask.completed = completed;
    writeDB(db);

    return NextResponse.json({ id: subtaskId, completed });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
