"use client";

import SubTaskItem from "./SubTaskItem";

import { SubTaskTimelineProps } from "./types";

export default function SubTaskTimeline({
  subtasks,
  onToggle,
}: SubTaskTimelineProps) {
  return (
    <div className="px-10 pb-5 pt-1">
      {subtasks.map((item, index) => (
        <SubTaskItem
          key={item.id}
          subtask={item}
          isLast={index === subtasks.length - 1}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
