import { Subtask, TaskCategory } from "@/types/task";

export interface AddTaskProps {
  title: string;
  setTitle: (value: string) => void;

  description: string;
  setDescription: (value: string) => void;

  dueDate: string;
  setDueDate: (value: string) => void;

  estimatedDuration: number | null;
  setEstimatedDuration: (value: number | null) => void;

  categoryId: string;
  setCategoryId: (value: string) => void;

  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;

  isCreating: boolean;
  handleCreateTask: () => void;

  onClose?: () => void;

  categories?: TaskCategory[];

  next?: () => void;

  back?: () => void;
}
