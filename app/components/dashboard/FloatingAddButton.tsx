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
      bottom-6
      right-6
      z-50

      w-[64px]
      h-[64px]

      rounded-full

     bg-white
      shadow-[0_10px_35px_rgba(89,183,255,.35)]

      flex
      items-center
      justify-center

      transition-all
      duration-300

      hover:scale-105
      active:scale-95
    "
    >
      <Image src="/icons/add-icon.svg" alt="add" width={26} height={26} />
    </button>
  );
}
