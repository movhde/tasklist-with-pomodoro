"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DarkModeButton from "@/app/components/Elements/DarkModeButton";

interface Props {
  onLogout: () => void;
}

export default function UserActions({ onLogout }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-fit flex rounded-full items-center justify-center transition hover:bg-[#EEF5FF] dark:hover:bg-[#414462]"
      >
        {/* <Image
          src="/icons/setting.svg"
          alt="settings"
          width={40}
          height={40}
          className="dark:[filter:brightness(0)_saturate(100%)_invert(72%)_sepia(29%)_saturate(2697%)_hue-rotate(290deg)]"
          /> */}
        <DarkModeButton />
      </button>

      {/* <div
        className={`absolute top-[52px] right-0 w-[80px] overflow-hidden shadow-[0_0_10px_rgba(89,190,255,0.2)] border border-[#eaf1f7] bg-white dark:bg-[#32334B] rounded-[28px] transition-all duration-300 ${
          open
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="h-[52px] px-2 flex items-center /30">
          <DarkModeButton />
        </div>

        <button
          onClick={onLogout}
          className="w-full h-[52px] px-2 text-left text-[#FF679D] transition hover:bg-[#FFF0F6] dark:hover:bg-[#414462]"
        >
          Log out
        </button>
      </div> */}
    </div>
  );
}
