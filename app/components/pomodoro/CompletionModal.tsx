"use client";

import Image from "next/image";

interface CompletionModalProps {
  open: boolean;
  onComplete: () => void;
  onAddSession: () => void;
}

export function CompletionModal({
  open,
  onComplete,
  onAddSession,
}: CompletionModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-[28px] shadow-[0_8px_40px_rgba(89,183,255,0.2)] p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#EEF5FF] flex items-center justify-center text-3xl">
          <Image
            src={"/icons/pomodoro.svg"}
            alt="clock icon"
            width={30}
            height={30}
          />
        </div>

        <div className="text-center">
          <h2 className="font-sniglet text-xl font-bold text-[#303153] mb-2">
            Time&apos;s up !
          </h2>
          <p className="font-sniglet text-sm text-[#6D7085] leading-relaxed">
            Did you complete your task?
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onComplete}
            className="w-full h-12 rounded-2xl bg-[#59B7FF] font-sniglet text-white font-semibold text-sm transition-all duration-200 hover:bg-[#3da8f5] active:scale-95 shadow-[0_4px_14px_rgba(89,183,255,0.4)] cursor-pointer"
          >
            Yes, I&apos;m done!
          </button>

          <button
            onClick={onAddSession}
            className="w-full h-12 rounded-2xl border border-[#FD81B0]/40 font-sniglet text-[#FD81B0] font-semibold text-sm transition-all duration-200 hover:bg-[#FD81B0]/5 active:scale-95 cursor-pointer"
          >
            Add 25 more minutes
          </button>
        </div>
      </div>
    </div>
  );
}
