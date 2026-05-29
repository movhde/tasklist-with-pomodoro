"use client";

import { LucideIcon } from "lucide-react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export default function ModalInput({ icon: Icon, ...props }: Props) {
  return (
    <div
      className="group flex h-12 items-center gap-3 rounded-[24px] border border-[#E8EEF7] bg-white px-5 
    shadow-[0_4px_18px_rgba(15,23,42,.04)] transition-all duration-300 focus-within:border-[#8EC5FF] focus-within:shadow-[0_10px_28px_rgba(89,183,255,.14)]"
    >
      {Icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F8FF]">
          <Icon size={18} className="text-[#8EC5FF]" />
        </div>
      )}

      <input
        {...props}
        className="h-full w-full bg-transparent text-[15px] text-[#2D325A] outline-none placeholder:text-[#A0A8C1]"
      />
    </div>
  );
}
