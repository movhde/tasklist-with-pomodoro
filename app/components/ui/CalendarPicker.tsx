"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { CalendarDays } from "lucide-react";

import "react-day-picker/style.css";

interface Props {
  value?: string;
  onChange: (date: string) => void;
}

export default function CalendarPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

  const formatDate = (date: Date) => {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
  };

  const [selected, setSelected] = useState<Date | undefined>(
    value ? parseDate(value) : undefined,
  );

  useEffect(() => {
    setSelected(value ? parseDate(value) : undefined);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (date?: Date) => {
    if (!date) return;

    setSelected(date);

    onChange(formatDate(date));

    setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 rounded-2xl md:rounded-[24px] border border-[#3AAFF8] md:border-white/5 bg-white
        dark:bg-[#2B2D42]/95 animate-in fade-in zoom-in-95 duration-200 px-4 py-3 text-[#252842] dark:text-white"
      >
        <CalendarDays size={18} />

        <span>{value || "Select date"}</span>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 z-50 mt-4 w-full max-w-[350px] -translate-x-1/2 rounded-[36px] border border-white/5 bg-[#FD81B0]/40 p-4 backdrop-blur-xl sm:p-5 md:left-0 md:w-[350px] md:translate-x-0 md:p-7">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}
