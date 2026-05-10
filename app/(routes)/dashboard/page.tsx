"use client";

import Header from "@/app/components/Layout/Header";
import { useUser } from "@/hooks/useUser";

export default function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading)
    return (
      <main className="w-full flex flex-col min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180 dark:from-0% dark:from-[#0F102A] dark:via-none dark:to-100% dark:to-[#999999] ">
        <Header />
        <div className="w-full p-6 flex flex-1 items-center justify-center">
          <div className="w-full flex flex-col gap-8 items-center justify-center max-w-3xl min-h-32 font-sniglet rounded-4xl drop-shadow-2xl bg-white dark:bg-[#32334B] px-4 py-12">
            <h1 className="font-extrabold text-4xl text-[#303153] dark:text-white md:text-6xl">
              Welcome
            </h1>
            <p className="font-bold text-center text-xl md:text-2xl text-[#303153] dark:text-white">
              Loading...
            </p>
          </div>
        </div>
      </main>
    );

  return (
    <main className="w-full flex flex-col min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180 dark:from-0% dark:from-[#0F102A] dark:via-none dark:to-100% dark:to-[#999999] ">
      <Header />
      <div className="w-full p-6 flex flex-1 items-center justify-center">
        <div className="w-full flex flex-col gap-8 items-center justify-center max-w-3xl min-h-32 font-sniglet rounded-4xl drop-shadow-2xl bg-white dark:bg-[#32334B] px-4 py-12">
          <h1 className="font-extrabold text-4xl text-[#303153] dark:text-white md:text-6xl">
            Welcome
          </h1>
          <p className="font-bold text-center text-xl md:text-2xl text-[#303153] dark:text-white">
            {user
              ? `You logged in as ${user.email}`
              : `You're not logged in yet!`}
          </p>
        </div>
      </div>
    </main>
  );
}
