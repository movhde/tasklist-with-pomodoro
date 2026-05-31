"use client";

import { Save, Trash2, X } from "lucide-react";

interface Props {
  isLoading?: boolean;
  onDelete: () => void;
  onSave: () => void;
  onCancel?: () => void;
}

export default function EditTaskFooter({
  isLoading,
  onDelete,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="flex items-center justify-between border-t border-black/5 pt-5">
      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={onDelete}
          className="flex items-center gap-1 sm:gap-2 font-sniglet rounded-[16px] sm:rounded-[20px] bg-red-50 px-3 py-2 sm:px-5 sm:py-3 text-red-500 transition-all duration-200 hover:bg-red-100"
        >
          <Trash2 size={12} className="sm:w-[16px] sm:h-[16px]" />
          <span className="text-[14px] sm:text-[14px]">Delete</span>
        </button>

        {onCancel && (
          <button
            onClick={onCancel}
            className="flex items-center  gap-1 sm:gap-2 rounded-[16px] sm:rounded-[20px] border border-black/5 bg-[#F4F7FB] px-3 py-2 sm:px-6 sm:py-3
             text-[#303153] font-sniglet transition-all duration-200 hover:bg-[#EAEFF5] dark:bg-[#363750] dark:text-white"
          >
            <span className="text-[14px] sm:text-[14px]">Cancel</span>
          </button>
        )}
      </div>

      <button
        disabled={isLoading}
        onClick={onSave}
        className="cursor-pointer flex items-center gap-1 sm:gap-2 rounded-[16px] sm:rounded-[20px]  px-12  
        bg-gradient-to-r from-[#FD81B0] via-[#FD81B0] to-[#FD81B0] sm:from-[#5DAEFF] sm:via-[#7D8DF7] sm:to-[#E58AB2]  py-2 sm:px-8 sm:py-3 font-semibold tracking-wide
         font-sniglet  text-white shadow-[0_10px_24px_rgba(253,129,176,.25)] sm:shadow-[0_10px_24px_rgba(89,183,255,.20)] transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={12} className="sm:w-[16px] sm:h-[16px]" />
        <span className="text-[14px] sm:text-[14px]">
          {isLoading ? "Saving" : "Save"}
        </span>
      </button>
    </div>
  );
}
