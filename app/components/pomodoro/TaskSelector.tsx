"use client";

import { TaskWithCategory } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

interface TaskSelectorProps {
  selectedTaskId?: string;
  onSelect: (task: TaskWithCategory) => void;
}

export function TaskSelector({ selectedTaskId, onSelect }: TaskSelectorProps) {
  const { tasks, isLoading } = useTasks();

  const incompleteTasks = [...tasks]
    .reverse()
    .filter((task) => !task.completed);

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading tasks...</p>;
  }

  if (incompleteTasks.length === 0) {
    return (
      <p className="text-sm text-[#6D7085] dark:text-[#C6C7D2]">
        No pending tasks found.
      </p>
    );
  }

  return (
    <div className="md:w-1/2 w-full flex flex-col gap-3">
      <p className="text-sm font-semibold text-[#303153] dark:text-white">
        Select a task to focus on
      </p>
      <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {incompleteTasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onSelect(task)}
            className={`w-full text-left px-4 py-3 rounded-2xl border transition-all duration-200 ${
              selectedTaskId === task.id
                ? "border-[#59B7FF]/60 bg-[#EEF5FF] dark:bg-[#414462]"
                : "border-[#59B7FF]/20 bg-white dark:bg-[#31304A] hover:bg-[#EEF5FF]/60 dark:hover:bg-[#3D3E58]"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                selectedTaskId === task.id
                  ? "text-[#303153] dark:text-white"
                  : "text-[#303153] dark:text-[#F4F4F4]"
              }`}
            >
              {task.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {task.category && (
                <span className="text-xs text-[#59B7FF]">
                  {task.category.name}
                </span>
              )}
              {task.category && task.estimatedDuration && (
                <span className="text-xs text-[#6D7085]">·</span>
              )}
              {task.estimatedDuration && (
                <span className="text-xs text-[#6D7085]">
                  {task.estimatedDuration} min
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
