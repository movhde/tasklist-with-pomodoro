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

import { useUser } from "@/hooks/useUser";
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
      ? categories.find((c: any) => c.id === filter.categoryId)?.name
      : undefined;

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!user) return null;

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
    <main className="min-h-screen bg-[#f8fcff] dark:bg-[#28273D]">
      <div className="min-h-screen lg:flex">
        <Sidebar email={user.email} filter={filter} onChange={setFilter} />

        <section className="flex-1 overflow-y-auto px-5 lg:px-14 pt-4 lg:py-8">
          {/* MOBILE HEADER */}
          <div className="lg:hidden mb-3">
            <div className="flex justify-end mb-3">
              <UserProfile mobile email={user.email} />
            </div>

            <GreetingHeader />

            <div className="flex items-center justify-end gap-1">
              <EditIcon className="w-6 h-6" />

              <MobileSidebar>
                <SidebarMenu
                  email={user.email}
                  filter={filter}
                  onChange={(f) => {
                    if (f.mode === "category") {
                      setFilter({ ...f, date: undefined });
                    } else {
                      setFilter(f);
                    }
                  }}
                />
              </MobileSidebar>
            </div>
          </div>

          <div className="w-full max-w-[980px]">
            {/* DESKTOP GREETING (category -> hide) */}
            {filter.mode !== "category" && (
              <div className="hidden lg:block">
                <GreetingHeader />
              </div>
            )}

            {/*  DESKTOP CALENDAR (category -> hide) */}
            {filter.mode !== "category" && (
              <div className="hidden md:block">
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
              </div>
            )}

            {/*  MOBILE CALENDAR (category -> hide) */}
            <div className="md:hidden">
              {filter.mode !== "category" && (
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
              )}
            </div>

            {/* MOBILE CATEGORY CHIPS */}
            {filter.mode === "category" && (
              <div className="md:hidden mt-4">
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    onClick={() =>
                      setFilter({
                        mode: "category",
                        categoryId: undefined,
                      })
                    }
                    className={`shrink-0 px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      filter.categoryId === undefined
                        ? "bg-[#80b7e0] border-[#59B7FF] text-white shadow-[0_2px_8px_rgba(89,183,255,.18)] dark:bg-[#FD81B0] dark:border-[#FD81B0] dark:text-white dark:shadow-[0_0_8px_rgba(253,129,176,.12)]"
                        : "bg-white border-[#59B7FF]/70 text-[#303153] dark:bg-[#32334B] dark:border-[#FD81B0]/20 dark:text-[#F4F4F5]"
                    }`}
                  >
                    All
                  </button>

                  {categories.map((cat: any) => (
                    <button
                      key={cat.id}
                      onClick={() =>
                        setFilter({
                          mode: "category",
                          categoryId: cat.id,
                        })
                      }
                      className={`shrink-0 px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        filter.categoryId === cat.id
                          ? "bg-[#80b7e0] border-[#59B7FF] text-white shadow-[0_2px_8px_rgba(89,183,255,.18)] dark:bg-[#FD81B0] dark:border-[#FD81B0] dark:text-white dark:shadow-[0_0_8px_rgba(253,129,176,.12)]"
                          : "bg-white border-[#59B7FF]/70 text-[#303153] dark:bg-[#32334B] dark:border-[#FD81B0]/20 dark:text-[#F4F4F5]"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
