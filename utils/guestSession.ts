import { Task, TaskWithCategory } from "@/types/task";

type CreateGuestTaskPayload = {
  title: string;
  description?: string;
  dueDate?: string;
  estimatedDuration?: number;
  categoryId?: string;
  subtasks?: { title: string }[];
};

const GUEST_TASKS_KEY = "guest_tasks";

function getStorageKey() {
  return GUEST_TASKS_KEY;
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

export function getGuestTasks(): TaskWithCategory[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = sessionStorage.getItem(getStorageKey());
    if (!raw) {
      return [];
    }

    return JSON.parse(raw) as TaskWithCategory[];
  } catch {
    return [];
  }
}

export function saveGuestTasks(tasks: TaskWithCategory[]) {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(getStorageKey(), JSON.stringify(tasks));
}

export function createGuestTask(data: CreateGuestTaskPayload): TaskWithCategory {
  const task: TaskWithCategory = {
    id: createId(),
    title: data.title.trim(),
    description: data.description || null,
    completed: false,
    userId: "guest",
    categoryId: data.categoryId || null,
    dueDate: data.dueDate || null,
    estimatedDuration:
      typeof data.estimatedDuration === "number"
        ? data.estimatedDuration
        : null,
    createdAt: new Date().toISOString(),
    subtasks: data.subtasks?.map((subtask) => ({
      id: createId(),
      title: subtask.title.trim(),
      estimatedDuration: null,
      createdAt: new Date().toISOString(),
      completed: false,
    })) || [],
    category: null,
  };

  const updatedTasks = [...getGuestTasks(), task];
  saveGuestTasks(updatedTasks);

  return task;
}

export function updateGuestTask(task: Task): TaskWithCategory {
  const tasks = getGuestTasks();
  const taskWithCategory: TaskWithCategory = {
    ...task,
    category: (task as TaskWithCategory).category ?? null,
  };
  const updatedTasks = tasks.map((existingTask) =>
    existingTask.id === task.id ? taskWithCategory : existingTask,
  );
  saveGuestTasks(updatedTasks);
  return taskWithCategory;
}

export function deleteGuestTask(taskId: string): boolean {
  const tasks = getGuestTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveGuestTasks(updatedTasks);
  return tasks.length !== updatedTasks.length;
}

export function toggleGuestSubtask(
  taskId: string,
  subtaskId: string,
  completed: boolean,
): TaskWithCategory | null {
  const tasks = getGuestTasks();
  const updatedTasks = tasks.map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    const subtasks = task.subtasks?.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, completed }
        : subtask,
    );

    const allSubtasksCompleted = subtasks?.every((st) => st.completed) ?? false;

    return {
      ...task,
      subtasks,
      completed: subtasks && subtasks.length > 0 ? allSubtasksCompleted : task.completed,
    };
  });

  saveGuestTasks(updatedTasks);

  return updatedTasks.find((task) => task.id === taskId) || null;
}
