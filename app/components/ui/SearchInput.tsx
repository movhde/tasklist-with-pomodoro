"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const expanded = !isMobile || isExpanded;

  return (
    <div
      className={`
        flex items-center overflow-hidden rounded-[18px] border
        bg-white shadow-[0_4px_14px_rgba(15,23,42,.04)]
        transition-all duration-300 ease-out
        dark:bg-[#363750]

        ${
          isFocused
            ? "border-[#59B7FF] shadow-[0_8px_24px_rgba(89,183,255,.2)]"
            : "border-[#DCE7F5] dark:border-[#FFFFFF20]"
        }

        ${
          isMobile
            ? expanded
              ? "w-[200px] px-4 py-3"
              : "h-[40px] w-[40px] justify-center"
            : "w-full max-w-[760px] px-4 py-3"
        }
      `}
    >
      <Search
        size={18}
        onClick={() => {
          if (isMobile && !expanded) {
            setIsExpanded(true);
          }
        }}
        className={`
          shrink-0 cursor-pointer transition-all duration-200
          ${isFocused ? "text-[#59B7FF]" : "text-[#A0A8C1]"}
        `}
      />

      {expanded && (
        <>
          <input
            autoFocus={isMobile}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);

              if (isMobile && !value.trim()) {
                setIsExpanded(false);
              }
            }}
            placeholder="Search tasks..."
            className="
              font-sniglet ml-3 w-full bg-transparent
              text-[15px] text-[#303153]
              outline-none
              placeholder:text-[#A0A8C1]
              dark:text-white
              dark:placeholder:text-[#7B8096]
            "
          />

          {isMobile && value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setIsExpanded(false);
              }}
              className="ml-2 shrink-0"
            >
              <X size={18} className="text-[#A0A8C1]" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
