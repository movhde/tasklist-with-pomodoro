"use client";

import { useUser } from "@/hooks/useUser";
import Image from "next/image";

export default function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <main className="w-full flex md:flex-col flex-row min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180 dark:from-0% dark:from-[#0F102A] dark:via-none dark:to-100% dark:to-[#999999] ">
        <div className="flex gap-1.5 items-center py-6 px-5 md:px-6">
          <Image
            src={"/images/logo.svg"}
            alt={"logo icon"}
            width={42}
            height={42}
          />
          <span className="text-black font-bold text-sm md:text-base dark:text-white">
            DailyWeb
          </span>
        </div>
        <div className="w-full flex flex-1 items-center justify-center">
          <div className="w-full flex items-center justify-center max-w-3xl min-h-32 rounded-4xl drop-shadow-2xl bg-white dark:bg-[#32334B] p-4">
            <p className="font-bold text-2xl text-[#303153] dark:text-white">
              Loading...
            </p>
          </div>
        </div>
      </main>
    );

  return (
    <main className="w-full flex md:flex-col flex-row min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180 dark:from-0% dark:from-[#0F102A] dark:via-none dark:to-100% dark:to-[#999999] ">
      <div className="flex gap-1.5 items-center py-6 px-5 md:px-6">
        <Image
          src={"/images/logo.svg"}
          alt={"logo icon"}
          width={42}
          height={42}
        />
        <span className="text-black font-bold text-sm md:text-base dark:text-white">
          DailyWeb
        </span>
      </div>
      <div className="w-full flex flex-1 items-center justify-center">
        <div className="w-full flex items-center justify-center max-w-3xl min-h-32 rounded-4xl drop-shadow-2xl bg-white dark:bg-[#32334B] p-4">
          <p className="font-bold text-2xl text-[#303153 dark:text-white">
            {user
              ? `You logged in as ${user.email}`
              : `You're not logged in yet!`}
          </p>
        </div>
      </div>
    </main>
  );
}
