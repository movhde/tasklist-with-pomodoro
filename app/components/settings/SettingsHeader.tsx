"use client";

import DarkModeButton from "@/app/components/Elements/DarkModeButton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsHeader() {
  const router = useRouter();

  return (
    <div
      className="
        mb-6

        flex
        items-center
        justify-between

        lg:mb-4
        lg:justify-end
      "
    >
      {/* Mobile Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
cursor-pointer
          text-[#303153]

          dark:text-white

          lg:hidden
        "
      >
        <ArrowLeft size={22} className="text-[#FD81B0]" />
      </button>

      <DarkModeButton />
    </div>
  );
}
