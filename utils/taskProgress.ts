import { Task } from "@/types/task";

export function getTaskProgress(task: Task) {
  const subtasks = task.subtasks || [];

  // NO SUBTASKS
  if (subtasks.length === 0) {
    return {
      progress: task.completed ? 100 : 0,
      completed: task.completed,
      done: task.completed ? 1 : 0,
      total: 1,
    };
  }

  // WITH SUBTASKS
  const done = subtasks.filter((s) => s.completed).length;

  const total = subtasks.length;

  const progress = Math.round((done / total) * 100);

  return {
    progress,
    completed: done === total,
    done,
    total,
  };
}
