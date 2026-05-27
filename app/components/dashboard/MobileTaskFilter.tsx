"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onChange: (mode: "all" | "today") => void;
}

export default function MobileTaskFilter({ onChange }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative lg:hidden flex justify-end">
      {" "}
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-[15px] font-medium underline text-[#484b4d] "
      >
        See all
      </button>
      <div
        className={`absolute top-full mt-2 right-0 w-[calc(100vw-40px)]
border border-[#59B7FF]/30 dark:border-[#FD81B0]/20
bg-white/50 dark:bg-[#2F3048]/40
backdrop-blur-sm rounded-2xl
shadow-[0_10px_40px_rgba(89,183,255,.15)]
dark:shadow-[0_0_24px_rgba(0,0,0,.18)]
overflow-hidden z-50 transition-all duration-200
${
  open
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 -translate-y-2 pointer-events-none"
}`}
      >
        <div className="p-4 text-[#303153] space-y-3">
          <button
            onClick={() => {
              onChange("all");
              setOpen(false);
            }}
            className="w-full text-left pb-2 border-b border-[#59B7FF]/20"
          >
            See all
          </button>

          <button
            onClick={() => {
              onChange("today");
              setOpen(false);
            }}
            className="w-full text-left"
          >
            Just today
          </button>
        </div>
      </div>
    </div>
  );
}
