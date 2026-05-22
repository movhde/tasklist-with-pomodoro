"use client";

import Image from "next/image";

interface EmptyStateProps {
  onAddTask: () => void;
}

export default function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-screen px-[30px]">
      <div className="w-full max-w-[500px] rounded-[30px] backdrop-blur-[5px] border border-white/30 shadow-xl shadow-blue-200 p-8 md:p-10">
        <div className="flex flex-col items-center justify-center text-center space-y-0.5">
          <h2 className="font-sniglet text-3xl md:text-4xl font-bold text-[#303153] dark:text-white">
            No Task
          </h2>

          <p className="font-sniglet text-gray-600 dark:text-gray-700 text-base md:text-lg">
            Add your routine!
          </p>

          <button
            onClick={onAddTask}
            className="relative w-10 h-10 md:w-16 md:h-12 focus:outline-none transition-transform hover:scale-105"
          >
            <Image
              src="/images/add-icon.svg"
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
