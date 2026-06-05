"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center gap-3 rounded-[24px] border 
      bg-white px-4 py-3 shadow-[0_4px_14px_rgba(15,23,42,.04)] 
      transition-all duration-300 ease-out
      dark:bg-[#363750]
      ${
        isFocused
          ? "border-[#59B7FF] shadow-[0_8px_24px_rgba(89,183,255,.2)] scale-[1.02] -translate-y-0.5"
          : "border-[#DCE7F5] hover:border-[#59B7FF]/50 hover:scale-[1.01] dark:border-[#FFFFFF20]"
      }`}
    >
      <Search
        size={20}
        className={`transition-all duration-300 ${isFocused ? "text-[#59B7FF] scale-110" : "text-[#A0A8C1]"}`}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search tasks..."
        className="font-sniglet w-full bg-transparent text-[15px] text-[#303153] outline-none
         placeholder:text-[#A0A8C1] dark:text-white dark:placeholder:text-[#7B8096]"
      />
    </div>
  );
}
