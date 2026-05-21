"use client";

import { useTasks } from "@/hooks/useTasks";

import TaskTimelineItem from "./TaskTimelineItem";

export default function TaskTimeline({ categoryId }: { categoryId?: string }) {
  const { tasks, isLoading } = useTasks(categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="
    flex
    flex-col

    max-w-[620px]
    "
    >
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
