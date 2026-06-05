import { TaskWithCategory } from "@/types/task";

export function searchTasks(tasks: TaskWithCategory[], query: string) {
  const search = query.toLowerCase().trim();

  if (!search) {
    return tasks;
  }

  return tasks.filter((task) => {
    const titleMatch = task.title?.toLowerCase().includes(search);

    const descriptionMatch = task.description?.toLowerCase().includes(search);

    const subtaskMatch = task.subtasks?.some((subtask) =>
      subtask.title?.toLowerCase().includes(search),
    );

    return titleMatch || descriptionMatch || subtaskMatch;
  });
}
