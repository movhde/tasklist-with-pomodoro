"use client";

import { motion } from "framer-motion";
import { ChevronDown, Clock3, SquarePen } from "lucide-react";

import ProgressRing from "./ProgressRing";
import { TaskGroupHeaderProps } from "./types";

export default function TaskGroupHeader({
  task,
  completed,
  done,
  total,
  progress,
  open,
  onToggleTask,
  onToggleOpen,
  onEdit,
}: TaskGroupHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <button
          onClick={onToggleTask}
          className="mt-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[4px] border-[#59B7FF] transition-all duration-200 dark:border-[#FD81B0]"
        >
          <div
            className={`rounded-full bg-[#59B7FF] transition-all duration-200 dark:bg-[#FD81B0] ${
              completed ? "h-[8px] w-[8px] opacity-100" : "h-0 w-0 opacity-0"
            }`}
          />
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`font-sniglet text-[17px] font-semibold tracking-wide transition-all duration-300 md:text-[19px] ${
              completed
                ? "line-through text-[#7E809A] opacity-50"
                : "text-[#303153] dark:text-white"
            }`}
          >
            {task.title}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <p className="text-[12px] text-[#7B7D93] dark:text-[#C6C7D2]">
              {task.subtasks?.length
                ? `${done} of ${total} subtasks completed`
                : completed
                  ? "Completed"
                  : "Not completed"}
            </p>

            {task.estimatedDuration && (
              <div className="flex items-center gap-1 text-[12px] text-[#7B7D93] dark:text-[#C6C7D2]">
                <Clock3 size={13} />
                <span>{task.estimatedDuration}m</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={onEdit}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#59B7FF]/10 text-[#59B7FF] transition-all duration-200 hover:scale-105 hover:bg-[#59B7FF]/20 dark:bg-[#FD81B0]/10 dark:text-[#FD81B0] dark:hover:bg-[#FD81B0]/20"
        >
          <SquarePen size={16} />
        </button>

        <ProgressRing progress={progress} completed={completed} />

        <button
          onClick={() => task.subtasks?.length && onToggleOpen()}
          disabled={!task.subtasks?.length}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown
              size={20}
              className={
                task.subtasks?.length
                  ? "text-[#59B7FF] dark:text-[#FD81B0]"
                  : "text-gray-300 dark:text-gray-600"
              }
            />
          </motion.div>
        </button>
      </div>
    </div>
  );
}
