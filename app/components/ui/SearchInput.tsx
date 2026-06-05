"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-[#E8EEF7] bg-white px-4 py-3 shadow-[0_4px_14px_rgba(15,23,42,.04)] dark:border-[#FFFFFF10] dark:bg-[#363750]">
      <Search size={18} className="text-[#8C95B2]" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="font-sniglet w-full bg-transparent text-[15px] text-[#303153] outline-none placeholder:text-[#9EA3B5] dark:text-white"
      />
    </div>
  );
}
