"use client";

import { useTasks } from "@/hooks/useTasks";

import AppLoader from "../ui/AppLoader";
import EmptyState from "../dashboard/EmptyState";

import TaskGroup from "./TaskGroup";

interface Props {
  categoryId?: string;
  date?: string;
  onAddTask: () => void;
}

export default function TaskTimeline({ categoryId, date, onAddTask }: Props) {
  const { tasks, isLoading } = useTasks(categoryId, date);

  if (isLoading) {
    return <AppLoader />;
  }

  if (tasks.length <= 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <div className="flex flex-col gap-4 max-w-[760px]">
      {tasks.map((task: any) => (
        <TaskGroup key={task.id} task={task} />
      ))}
    </div>
  );
}
