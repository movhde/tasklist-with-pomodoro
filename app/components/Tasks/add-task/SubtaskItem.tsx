"use client";

import { Trash2 } from "lucide-react";

import { Subtask } from "@/types/task";

interface Props {
  subtask: Subtask;
  onDelete: () => void;
}

export default function SubtaskItem({ subtask, onDelete }: Props) {
  return (
    <div
      id={`subtask-${subtask.id}`}
      className="font-sniglet subtask-enter flex items-center justify-between rounded-[18px] border border-black/5 bg-white/70 px-4 py-3 dark:bg-[#363750]"
    >
      <span className="font-sniglet text-[14px] text-[#303153] dark:text-white">
        {subtask.title}
      </span>

      <button
        onClick={onDelete}
        className="text-[13px] text-red-500 transition-all duration-200 hover:text-red-600"
      >
        <Trash2 className="cursor-pointer text-red-500 transition-colors hover:text-red-700" />
      </button>
    </div>
  );
}
