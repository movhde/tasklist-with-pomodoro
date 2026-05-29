export interface TaskCategory {
  id: string;
  name: string;
  userId: string;
  createdAt: string | null;
}

export interface Subtask {
  id: string;

  title: string;

  estimatedDuration?: number | null;

  createdAt?: string;

  completed: boolean;
}

export interface Task {
  id: string;

  title: string;

  description?: string | null;

  completed: boolean;

  userId: string;

  categoryId?: string | null;

  dueDate?: string | null;

  estimatedDuration?: number | null;

  createdAt: string;

  subtasks?: Subtask[];
}

export interface TaskWithCategory extends Task {
  category: TaskCategory | null;
}
