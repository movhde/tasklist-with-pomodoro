"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/components/dashboard/Sidebar";

import TaskTimeline from "@/app/components/Tasks/TaskTimeline";

import { useUser } from "@/hooks/useUser";

export default function DashboardPage() {
  const router = useRouter();

  const { user, isLoading } = useUser();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-[#28273D]">
        Loading...
      </main>
    );
  }

  if (!user) return null;

  return (
    <main
      className="
      min-h-screen

      flex

      bg-white
      dark:bg-[#28273D]
      "
    >
      <Sidebar
        selectedCategory={selectedCategoryId}
        onChange={setSelectedCategoryId}
      />

      <section
        className="
        flex-1

        overflow-y-auto

        px-6
        py-10

        md:px-10
        lg:px-14
        "
      >
        <div
          className="
          max-w-[760px]
          "
        >
          <div className="mb-10">
            <h1
              className="
              font-sniglet

              text-[28px]
              md:text-[36px]

              font-bold

              tracking-wider

              text-[#303153]

              dark:text-white
              "
            >
              Your Tasks
            </h1>

            <p
              className="
              mt-2

              tracking-wider

              text-sm

              text-[#808080]
              dark:text-gray-400
              "
            >
              {user.email}
            </p>
          </div>

          <TaskTimeline categoryId={selectedCategoryId} />
        </div>
      </section>
    </main>
  );
}
