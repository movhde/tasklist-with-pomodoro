"use client";

import { SubTaskItemProps } from "./types";

export default function SubTaskItem({
  subtask,
  isLast,
  onToggle,
}: SubTaskItemProps) {
  return (
    <div className="relative flex gap-4 pb-5">
      <div className="relative flex w-[24px] shrink-0 justify-center">
        {!isLast && (
          <div className="absolute left-1/2 top-[20px] h-0 w-[2px] -translate-x-1/2 rounded-full bg-[#FD81B0] animate-grow-line dark:bg-[#FD81B0]" />
        )}

        <button
          onClick={() => onToggle(subtask.id)}
          className={`relative z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full border-[4px] shadow-[0_0_10px_rgba(0,0,0,.08)] transition-all duration-200 dark:shadow-[0_0_12px_rgba(0,0,0,.25)] ${
            subtask.completed
              ? "border-[#FD81B0] bg-[#FD81B0]"
              : "border-[#FD81B0] bg-white dark:bg-[#2B2D42]"
          }`}
        >
          <div
            className={`rounded-full bg-white transition-all duration-200 dark:bg-[#303153] ${
              subtask.completed
                ? "h-[6px] w-[6px] opacity-100"
                : "h-0 w-0 opacity-0"
            }`}
          />
        </button>
      </div>

      <div
        className={`flex flex-1 items-center justify-between border-b border-[#FD81B0]/10 pb-5 transition-all duration-300 dark:border-[#FD81B0]/10 ${
          subtask.completed ? "opacity-50" : ""
        }`}
      >
        <div className="min-w-0">
          <p
            className={`font-sniglet text-[14px] transition-all duration-300 md:text-[15px] ${
              subtask.completed
                ? "text-[#75767f] line-through"
                : "text-[#303153] dark:text-white"
            }`}
          >
            {subtask.title}
          </p>
        </div>
      </div>
    </div>
  );
}
