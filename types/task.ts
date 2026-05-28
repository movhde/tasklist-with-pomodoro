export interface TaskCategory {
  id: string;
  name: string;
  userId: string;
  createdAt: string | null;
}

export interface Subtask {
  id: string;

  title: string;

  duration?: number;

  completed: boolean;
}

export interface Task {
  id: string;

  title: string;

  description?: string;

  completed: boolean;

  userId: string;

  categoryId?: string;

  dueDate?: string;

  duration?: number;

  createdAt: string;

  subtasks?: Subtask[];
}

export interface TaskWithCategory extends Task {
  category: TaskCategory | null;
}
