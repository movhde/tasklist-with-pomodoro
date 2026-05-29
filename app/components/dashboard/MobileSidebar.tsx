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
    <div ref={ref} className="lg:hidden relative">
      <div className="relative">
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
          className={`absolute top-0 right-0
  w-[calc(100vw-40px)]
  max-w-[980px]
  rounded-2xl
  border border-[#59B7FF]/30 dark:border-[#FD81B0]/20
  bg-white/50 dark:bg-[#2F3048]/40
  backdrop-blur-sm backdrop-saturate-100
  shadow-[0_10px_40px_rgba(89,183,255,.15)]
  dark:shadow-[0_0_40px_#00000020]
  transition-all duration-300
  z-[999]
  ${
    open
      ? "opacity-100 scale-100 pointer-events-auto"
      : "opacity-0 scale-95 pointer-events-none"
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

          <div className="relative z-10 px-5 py-5 pr-12 space-y-2 text-[#303153] dark:text-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
