"use client";

import { useEffect } from "react";
import { TaskWithCategory } from "@/types/task";
import useTaskGroup from "@/app/components/Tasks/task-group/useTaskGroup";
import TaskGroupHeader from "@/app/components/Tasks/task-group/TaskGroupHeader";
import TaskGroupContent from "@/app/components/Tasks/task-group/TaskGroupContent";

interface TaskPanelProps {
  task: TaskWithCategory;
  onTaskCompleted: () => void;
}

export function TaskPanel({ task, onTaskCompleted }: TaskPanelProps) {
  const {
    taskState,
    open,
    setOpen,
    progress,
    completed,
    done,
    total,
    toggleTask,
    toggleSubtask,
  } = useTaskGroup(task);

  useEffect(() => {
    if (taskState.completed) {
      onTaskCompleted();
    }
  }, [taskState.completed]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* تسک + ساب‌تسک‌ها */}
      <div className="overflow-hidden rounded-[22px] border border-[#59B7FF]/20 bg-white shadow-[0_4px_20px_rgba(0,0,0,.03)] transition-all duration-300 dark:border-[#FD81B0]/15 dark:bg-[#31304A]">
        <TaskGroupHeader
          task={taskState}
          completed={completed}
          done={done}
          total={total}
          progress={progress}
          open={open}
          onToggleTask={toggleTask}
          onToggleOpen={() => setOpen(!open)}
          onEdit={() => {}}
          onDelete={() => {}}
        />
        <TaskGroupContent
          open={open}
          subtasks={taskState.subtasks || []}
          onToggleSubtask={toggleSubtask}
        />
      </div>

      <div className="rounded-[22px] border border-[#59B7FF]/20 bg-white shadow-[0_4px_20px_rgba(0,0,0,.03)] dark:border-[#FD81B0]/15 dark:bg-[#31304A] p-5 flex flex-col gap-2">
        <p className="font-sniglet text-sm font-medium text-[#6D7085] dark:text-[#C6C7D2]">
          Description
        </p>
        {taskState.description ? (
          <p className="font-sniglet text-sm text-[#303153] dark:text-[#F4F4F4] leading-relaxed">
            {taskState.description}
          </p>
        ) : (
          <p className="font-sniglet text-sm text-[#6D7085]/60 dark:text-[#C6C7D2]/40 italic">
            No description
          </p>
        )}
      </div>
    </div>
  );
}
