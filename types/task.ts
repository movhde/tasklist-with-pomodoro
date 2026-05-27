export interface TaskCategory {
  id: string;
  name: string;
  userId: string;
  createdAt: string | null;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  estimatedDuration: number | null;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId: string;
  categoryId: string | null;
  dueDate: string | null;
  estimatedDuration: number | null;
  subtasks: Subtask[];
  createdAt: string;
}

export interface TaskWithCategory extends Task {
  category: TaskCategory | null;
}
