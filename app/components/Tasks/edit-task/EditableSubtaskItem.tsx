"use client";

import { Trash2 } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
}

export default function EditableSubtaskItem({
  value,
  onChange,
  onDelete,
}: Props) {
  return (
    <div
      className="
      flex items-center justify-between
      rounded-[18px]
      border border-black/5
      bg-white/70
      px-4 py-3
      dark:bg-[#363750]
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
        className="text-red-500 transition-all hover:text-red-700"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
