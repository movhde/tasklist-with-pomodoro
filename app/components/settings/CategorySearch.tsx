"use client";

import { Search } from "lucide-react";

export default function CategorySearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-[48px] items-center gap-2 rounded-full border border-[#EAEAEA] bg-white px-4 shadow-[0_6px_18px_rgba(0,0,0,0.03)] dark:border-[#FFFFFF18] dark:bg-[#2E2F46]">
      <Search size={18} className="text-[#A0A8C1] dark:text-[#7B8096]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search category"
        className="w-full bg-transparent text-[13px] text-[#303153] outline-none placeholder:text-[#A0A8C1] dark:text-white dark:placeholder:text-[#7B8096]"
      />
    </div>
  );
}

