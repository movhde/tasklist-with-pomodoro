import { Subtask, Task } from "@/types/task";

export interface TaskGroupHeaderProps {
  task: Task;

  completed: boolean;

  done: number;

  total: number;

  progress: number;

  open: boolean;

  onToggleTask: () => void;

  onToggleOpen: () => void;

  onEdit: () => void;
}

export interface TaskGroupContentProps {
  open: boolean;

  subtasks: Subtask[];

  onToggleSubtask: (subtaskId: string) => void;
}

export interface SubTaskTimelineProps {
  subtasks: Subtask[];

  onToggle: (subtaskId: string) => void;
}

export interface SubTaskItemProps {
  subtask: Subtask;

  isLast: boolean;

  onToggle: (subtaskId: string) => void;
}
