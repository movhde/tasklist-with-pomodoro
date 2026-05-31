"use client";

import { ListPlus, X } from "lucide-react";

interface Props {
  onClose?: () => void;
}

export default function AddTaskHeader({ onClose }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-[62px] w-[62px] items-center justify-center rounded-[22px]
            bg-gradient-to-br
            from-[#EEF5FF]
            to-[#FCEEF5]
            shadow-[0_10px_24px_rgba(15,23,42,.06)]
            dark:from-[#2e3f5a]
            dark:to-[#2d1b2e]
            dark:shadow-[0_10px_24px_rgba(0,0,0,.2)]
          "
        >
          <ListPlus size={28} className="text-[#7D8DF7] dark:text-[#bfc7f0]" />
        </div>

        <div>
          <h2 className="font-sniglet text-[32px] font-semibold tracking-tight text-[#252842] dark:text-white">
            Create task
          </h2>

          <p className="font-sniglet mt-1 text-[14px] text-[#7B8096] dark:text-[#BFC3D4]">
            Organize your workflow beautifully
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="
          font-sniglet
          flex h-[44px] w-[44px]
          cursor-pointer
          items-center justify-center
          rounded-full
          border border-black/5
          bg-[#F4F7FB]
          transition-all duration-200
          hover:rotate-90
          hover:scale-105
          hover:bg-[#E9EEF5]
          dark:bg-[#3A3C57]
          dark:hover:bg-[#4A4C69]
        "
      >
        <X size={18} className="text-[#303153] dark:text-white" />
      </button>
    </div>
  );
}
