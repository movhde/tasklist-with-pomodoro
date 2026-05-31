"use client";

import Image from "next/image";

interface Props {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
      fixed
      bottom-4
      right-6
      z-40
w-14 h-14
      md:w-[64px]
      md:h-[64px]

      rounded-full
dark:bg-[#32334B]
     bg-white
      shadow-[0_10px_35px_rgba(89,183,255,.35)]
cursor-pointer
      flex
      items-center
      justify-center

      transition-all
      duration-300

      hover:scale-105
      active:scale-95
    "
    >
      <Image src="/icons/add-icon.svg" alt="add" width={20} height={20} />
    </button>
  );
}
