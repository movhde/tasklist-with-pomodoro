"use client";

import { Trash2 } from "lucide-react";

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}

export default function EditableSubtaskItem({
  id,
  value,
  onChange,
  onDelete,
}: Props) {
  return (
    <div
      id={`edit-subtask-${id}`}
      className="
        subtask-enter
        flex items-center justify-between
        rounded-[18px]
        border border-black/5
        bg-white/70
        px-4 py-3
        dark:bg-[#363750]
        transition-all duration-200
      "
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          flex-1
          bg-transparent
          text-[14px]
          text-[#303153]
          outline-none
          dark:text-white
        "
      />

      <button
        onClick={onDelete}
        className="text-[13px]  text-[#FD81B0] transition-all duration-200 hover: text-[#e06e9a]"
      >
        <Trash2 className="cursor-pointer text-[#FD81B0] transition-colors hover:text-[#ec4b89]" />
      </button>
    </div>
  );
}
