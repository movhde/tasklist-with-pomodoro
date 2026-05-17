export interface TaskCategory {
  id: string;
  name: string;
  userId: string;
  createdAt: string | null;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  userId: string;
  categoryId: string | null;
  dueDate: string | null;
  createdAt: string | null;
}

export interface TaskWithCategory extends Task {
  category: TaskCategory | null;
}
