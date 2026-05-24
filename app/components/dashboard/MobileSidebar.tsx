"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

export default function MobileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="lg:hidden w-full">
      <div ref={ref} className="w-full">
        {/* icon */}

        <button
          onClick={() => setOpen(!open)}
          className="h-[42px] mb-3 flex items-center"
        >
          <Image src="/icons/menu.svg" alt="menu" width={24} height={24} />
        </button>

        {/* menu */}

        <div
          className={`
          overflow-hidden

          transition-all
          duration-300

          ${open ? "max-h-[160px]" : "max-h-0"}
        `}
        >
          <div
            className="
            w-full

            h-[160px]

            overflow-y-auto

            border
            border-[#59B7FF]

            bg-white/20

            backdrop-blur-[30px]
            "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
