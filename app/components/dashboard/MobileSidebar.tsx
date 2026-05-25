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

    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div className="lg:hidden relative">
      <div ref={ref} className="relative">
        {/* trigger */}

        <button
          onClick={() => setOpen((v) => !v)}
          className="w-[40px] h-[40px] flex items-center justify-center relative z-50"
        >
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={22}
            height={22}
            className="dark:[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(29%)_saturate(2290%)_hue-rotate(295deg)_brightness(101%)_contrast(102%)]"
          />
        </button>

        {/* floating menu */}

        <div
          className={`absolute top-[-2px] right-[-2px] w-[360px] h-[160px] max-w-[92vw] rounded-[18px] border border-[#59B7FF]/50 dark:border-[#FD81B0]/30 bg-white/45 dark:bg-[#2F3048]/55 backdrop-blur-[22px] backdrop-saturate-150 shadow-[0_10px_40px_rgba(89,183,255,.18)] dark:shadow-[0_0_40px_#00000040] transition-all duration-300 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden z-[999] ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {/* top glow */}

          <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-[#FD81B0]/10 to-transparent pointer-events-none" />

          {/* menu icon */}

          <div className="absolute top-[10px] right-[10px] z-20">
            <button
              onClick={() => setOpen(false)}
              className="w-[28px] h-[28px] flex items-center justify-center"
            >
              <Image
                src="/icons/menu.svg"
                alt="menu"
                width={20}
                height={20}
                className="dark:[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(29%)_saturate(2290%)_hue-rotate(295deg)_brightness(101%)_contrast(102%)]"
              />
            </button>
          </div>

          {/* content */}

          <div className="relative z-10 min-h-max px-5 py-4 pr-12 space-y-2 text-[#303153] dark:text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
