"use client";

import Image from "next/image";
import Link from "next/link";
import DarkModeButton from "../Elements/DarkModeButton";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { logout } = useAuth();

  return (
    <section className="flex justify-between w-full bg-transparent gap-1.5 items-center py-6 px-5 md:py-6 md:px-12">
      <Link href={"/"} className="flex gap-1.5 items-center">
        <Image
          src={"/images/logo.svg"}
          alt={"logo icon"}
          width={42}
          height={42}
        />
        <span className="text-black font-sniglet tracking-widest font-bold text-sm md:text-base dark:text-white">
          DailyWeb
        </span>
      </Link>
      <div className="flex items-center gap-2 md:gap-6">
        <Link
          onClick={logout}
          href={"/"}
          className="font-sniglet tracking-wider font-bold text-sm md:text-base text-[#303153] dark:text-[#fefefe] transition duration-300 rounded-md px-2 md:px-3 py-1 hover:bg-[#bcdfee] dark:hover:bg-[#5b5c77]"
        >
          Log out
        </Link>
        <DarkModeButton />
      </div>
    </section>
  );
}
