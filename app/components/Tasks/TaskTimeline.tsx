"use client";

import { useTasks } from "@/hooks/useTasks";

import TaskTimelineItem from "./TaskTimelineItem";

import AppLoader from "../ui/AppLoader";
import EmptyState from "../dashboard/EmptyState";

interface Props {
  categoryId?: string;

  date?: string;
}

export default function TaskTimeline({ categoryId, date }: Props) {
  const { tasks, isLoading } = useTasks(categoryId, date);

  if (isLoading) {
    return <AppLoader />;
  }
  if (tasks.length <= 0) return <EmptyState onAddTask={() => {}} />;
  return (
    <div className="flex flex-col max-w-[760px]">
      {tasks.map((task, index) => (
        <TaskTimelineItem
          key={task.id}
          task={task}
          isLast={index === tasks.length - 1}
        />
      ))}
    </div>
  );
}
