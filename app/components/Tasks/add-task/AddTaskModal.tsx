"use client";

import AddTaskHeader from "./AddTaskHeader";
import AddTaskForm from "./AddTaskForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-6 backdrop-blur-[3px]">
      <div
        className="
          relative
          w-full
          max-w-[760px]
          max-h-[88vh]
          overflow-y-auto
          rounded-[34px]
          border
          border-white/20
          bg-gray-100
          shadow-[0_20px_70px_rgba(0,0,0,0.18)]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          dark:bg-[#2B2D42]/95
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        <div className="relative z-10 p-4 md:p-5">
          <AddTaskHeader onClose={onClose} />

          <AddTaskForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
