"use client";

import { Plus } from "lucide-react";

interface Props {
  isCreating: boolean;
  onClose?: () => void;
  onCreate: () => void;
}

export default function AddTaskFooter({
  isCreating,
  onClose,
  onCreate,
}: Props) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-5">
      <button
        onClick={onClose}
        className="font-sniglet cursor-pointer rounded-[20px] border border-black/5 bg-[#F4F7FB] px-6 py-3 text-[#303153] transition-all duration-200 hover:bg-[#EAEFF5] dark:bg-[#363750] dark:text-white"
      >
        Cancel
      </button>

      <button
        disabled={isCreating}
        onClick={onCreate}
        className="font-sniglet flex cursor-pointer items-center gap-2 rounded-[20px] bg-[#FD81B0] px-8 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(89,183,255,.20)] transition-all duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={16} />

        {isCreating ? "Creating..." : "Create task"}
      </button>
    </div>
  );
}
