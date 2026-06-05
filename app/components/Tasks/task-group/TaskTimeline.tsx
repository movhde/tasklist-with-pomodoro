"use client";

import { useTasks } from "@/hooks/useTasks";

import AppLoader from "../../ui/AppLoader";
import EmptyState from "../../dashboard/EmptyState";

import TaskGroup from "./TaskGroup";

interface Props {
  categoryId?: string;
  date?: string;
  search?: string;
  onAddTask: () => void;
}

export default function TaskTimeline({
  categoryId,
  date,
  search,
  onAddTask,
}: Props) {
  const { tasks, isLoading } = useTasks(categoryId, date);

  const filteredTasks = [...tasks]
    .reverse()
    .filter((task: any) =>
      task.title.toLowerCase().includes(search?.toLowerCase() || ""),
    );

  if (isLoading) {
    return <AppLoader />;
  }

  if (filteredTasks.length <= 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <div className="flex max-w-[760px] flex-col gap-4">
      {filteredTasks.map((task: any) => (
        <TaskGroup key={task.id} task={task} />
      ))}
    </div>
  );
}
