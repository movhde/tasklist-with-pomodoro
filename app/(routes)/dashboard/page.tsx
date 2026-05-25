"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditIcon from "../../components/Elements/EditIcon";
import Sidebar from "@/app/components/dashboard/Sidebar";
import SidebarMenu from "@/app/components/dashboard/SidebarMenu";
import MobileSidebar from "@/app/components/dashboard/MobileSidebar";
import UserProfile from "@/app/components/dashboard/UserProfile";

import GreetingHeader from "@/app/components/dashboard/GreetingHeader";
import WeekCalendar from "@/app/components/dashboard/WeekCalendar";
import TasksSection from "@/app/components/dashboard/TasksSection";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import UserActions from "@/app/components/dashboard/UserActions";
import { useTasks } from "@/hooks/useTasks";
import EmptyState from "@/app/components/dashboard/EmptyState";
import { useCategories } from "@/hooks/useCategories";

type FilterMode = "all" | "today" | "category" | "calendar";

interface DashboardFilter {
  mode: FilterMode;

  categoryId?: string;

  date?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { categories } = useCategories();
  const [filter, setFilter] = useState<DashboardFilter>({
    mode: "all",
  });

  const categoryName =
    filter.mode === "category" && filter.categoryId
      ? categories.find((c) => c.id === filter.categoryId)?.name
      : undefined;

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-[#28273D]">
        Loading...
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const title =
    filter.mode === "today"
      ? "Today Tasks"
      : filter.mode === "category"
        ? "Category"
        : filter.mode === "calendar"
          ? "Tasks"
          : "Your Tasks";

  const subtitle =
    filter.mode === "category"
      ? categoryName
      : filter.mode === "calendar"
        ? filter.date
        : undefined;

  return (
    <main className="min-h-screen bg-linear-[160deg] from-10% from-[#fff2f8] via-35% via-[#fdf0f7] to-60% to-[#d5e5ff]  dark:bg-linear-[160deg] dark:from-0% dark:from-[#373850] dark:via-none dark:to-100% dark:to-[#8C8EB9] ">
      <div className="min-h-screen lg:flex">
        <Sidebar email={user.email} filter={filter} onChange={setFilter} />

        <section className="flex-1 min-h-screen min-w-0 overflow-y-auto px-5 md:px-8 lg:px-14 pt-4 lg:py-8">
          {/* MOBILE HEADER */}
          <div className="lg:hidden mb-3">
            {/* avatar */}
            <div className="flex justify-end mb-3">
              <UserProfile mobile email={user.email} />
            </div>

            {/* greeting */}
            <GreetingHeader />

            {/* actions */}
            <div className="flex items-center justify-end gap-1 ">
              <EditIcon className="w-6 h-6 " />

              <MobileSidebar>
                <SidebarMenu
                  email={user.email}
                  filter={filter}
                  onChange={setFilter}
                />
              </MobileSidebar>
            </div>
          </div>

          <div className="w-full max-w-[980px]">
            <div className="hidden lg:block">
              <GreetingHeader />
            </div>

            <WeekCalendar
              selected={filter.date}
              onChange={(date) => {
                if (!date) {
                  setFilter({ mode: "all" });
                  return;
                }

                setFilter({
                  mode: "calendar",
                  date,
                });
              }}
            />

            <TasksSection
              title={title}
              subtitle={subtitle}
              categoryId={
                filter.mode === "category" ? filter.categoryId : undefined
              }
              date={
                filter.mode === "today"
                  ? new Date().toISOString().slice(0, 10)
                  : filter.mode === "calendar"
                    ? filter.date
                    : undefined
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
