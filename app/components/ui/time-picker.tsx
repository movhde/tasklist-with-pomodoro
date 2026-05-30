"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  value: number | null;
  onChange: (value: number) => void;
}

interface NumberControlProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

function NumberControl({ value, onChange, max }: NumberControlProps) {
  function increase() {
    const next = value + 1;

    if (max !== undefined) {
      onChange(next > max ? max : next);
      return;
    }

    onChange(next);
  }

  function decrease() {
    const next = value - 1;

    onChange(next < 0 ? 0 : next);
  }

  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-0.5 sm:gap-1">
      <button
        type="button"
        onClick={increase}
        className="flex h-5 w-5 sm:h-6 sm:w-6
         items-center justify-center rounded-full text-[#7B84B2] transition-all duration-200
         cursor-pointer hover:bg-[#EEF5FF]"
      >
        <ChevronUp size={13} className="sm:w-[15px] sm:h-[15px]" />
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={formattedValue}
        onChange={(e) => {
          let rawValue = e.target.value.replace(/[^\d]/g, "");

          if (rawValue === "") {
            onChange(0);
            return;
          }

          let numValue = parseInt(rawValue, 10);

          if (isNaN(numValue)) {
            onChange(0);
            return;
          }

          if (max !== undefined) {
            numValue = Math.min(max, Math.max(0, numValue));
          } else {
            numValue = Math.max(0, numValue);
          }

          onChange(numValue);
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            onChange(0);
          }
        }}
        className="
  h-[42px] w-[56px] sm:h-[48px] sm:w-[64px]
  rounded-[14px] sm:rounded-[16px]
  border border-[#E7EEF8]
  bg-white
  text-center text-[16px] sm:text-[18px]
  font-semibold text-[#2D325A]
  shadow-[0_4px_14px_rgba(15,23,42,.04)]
  outline-none transition-all duration-200
  focus:border-[#59B7FF]
  focus:ring-4 focus:ring-[#59B7FF]/10

  dark:bg-[#3A3D5A]
  dark:border-[#FFFFFF12]
  dark:text-white
  dark:shadow-none

  [appearance:textfield]
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
"
      />

      <button
        type="button"
        onClick={decrease}
        className="flex h-5 w-5 cursor-pointer sm:h-6 sm:w-6 items-center justify-center rounded-full text-[#7B84B2] transition-all duration-200 hover:bg-[#EEF5FF]"
      >
        <ChevronDown size={13} className="sm:w-[15px] sm:h-[15px]" />
      </button>
    </div>
  );
}

export default function TimePicker({ value, onChange }: Props) {
  const totalMinutes = value || 0;

  const [hours, setHours] = useState(Math.floor(totalMinutes / 60));
  const [minutes, setMinutes] = useState(totalMinutes % 60);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const finalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
    onChange(finalMinutes);
  }, [hours, minutes, seconds, onChange]);

  return (
    <div
      className="flex items-center justify-center gap-1 sm:gap-2 rounded-[18px] 
    sm:rounded-[20px] border border-[#E7EEF8] bg-[#F8FBFF] dark:bg-[#2B2D42]/95 animate-in fade-in zoom-in-95 duration-200 
     dark:border-[#FFFFFF10]   px-1.5 py-1.5 sm:px-2 sm:py-2"
    >
      <NumberControl value={hours} onChange={setHours} />

      <span className="pb-1 text-[18px] sm:text-[20px] font-semibold text-[#FF8DC7]">
        :
      </span>

      <NumberControl value={minutes} onChange={setMinutes} max={59} />

      <span className="pb-1 text-[18px] sm:text-[20px] font-semibold text-[#FF8DC7]">
        :
      </span>

      <NumberControl value={seconds} onChange={setSeconds} max={59} />
    </div>
  );
}
