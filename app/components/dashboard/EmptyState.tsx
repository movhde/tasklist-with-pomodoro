"use client";

import Image from "next/image";

interface EmptyStateProps {
  onAddTask: () => void;
}

export default function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center w-full h-full px-[30px]">
      <div className="w-full max-w-[500px] rounded-[30px] border border-white/30 bg-white/35 dark:bg-[#32334B]/55 backdrop-blur-[12px] shadow-xl shadow-blue-200/60 dark:shadow-[0_0_40px_#00000040] p-8 md:p-10">
        <div className="flex flex-col items-center justify-center text-center space-y-0.5">
          <h2 className="font-sniglet text-2xl md:text-4xl font-bold text-[#303153] dark:text-white">
            No Task
          </h2>

          <p className="font-sniglet text-[#707070] dark:text-[#C7C7DA] text-sm md:text-lg">
            Add your routine!
          </p>

          <button
            onClick={() => onAddTask()}
            className="relative w-6 h-6 md:w-10 md:h-10 mt-5 cursor-pointer focus:outline-none transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/icons/add-icon.svg"
              alt="Add task"
              fill
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
