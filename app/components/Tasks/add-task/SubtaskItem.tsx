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
        className="text-[13px] text-[#FD81B0] transition-all duration-200hover:text-[#ec4b89]"
      >
        <Trash2 className="cursor-pointer text-[#FD81B0] transition-colors hover:text-[#ec4b89]" />
      </button>
    </div>
  );
}
