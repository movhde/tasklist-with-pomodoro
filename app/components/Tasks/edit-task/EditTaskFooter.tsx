"use client";

import { Save, Trash2 } from "lucide-react";

interface Props {
  isLoading?: boolean;
  onDelete: () => void;
  onSave: () => void;
}

export default function EditTaskFooter({ isLoading, onDelete, onSave }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-black/5 pt-5">
      <button
        onClick={onDelete}
        className="
          flex items-center gap-2
          rounded-[20px]
          bg-red-50
          px-5 py-3
          text-red-500
          transition-all duration-200
          hover:bg-red-100
        "
      >
        <Trash2 size={16} />
        Delete task
      </button>

      <button
        disabled={isLoading}
        onClick={onSave}
        className="
          flex items-center gap-2
          rounded-[20px]
          bg-gradient-to-r
          from-[#5DAEFF]
          via-[#7D8DF7]
          to-[#E58AB2]
          px-8 py-3
          font-semibold
          text-white
          shadow-[0_10px_24px_rgba(89,183,255,.20)]
          transition-all duration-200
          hover:scale-[1.02]
        "
      >
        <Save size={16} />
        {isLoading ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
