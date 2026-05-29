"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditIcon from "../../components/Elements/EditIcon";
import Sidebar from "@/app/components/dashboard/Sidebar";
import SidebarMenu from "@/app/components/dashboard/SidebarMenu";
import MobileSidebar from "@/app/components/dashboard/MobileSidebar";
import UserProfile from "@/app/components/dashboard/UserProfile";
import FloatingAddButton from "@/app/components/dashboard/FloatingAddButton";
import GreetingHeader from "@/app/components/dashboard/GreetingHeader";
import WeekCalendar from "@/app/components/dashboard/WeekCalendar";
import TasksSection from "@/app/components/dashboard/TasksSection";
import { useUser } from "@/hooks/useUser";
import CategoryChip from "@/app/components/ui/category-chip";
import { useCategories } from "@/hooks/useCategories";
import AddTaskModal from "@/app/components/Tasks/AddTaskModal";

type FilterMode = "all" | "today" | "category" | "calendar";

interface DashboardFilter {
  mode: FilterMode;
  categoryId?: string;
  date?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, error } = useUser();
  const { categories } = useCategories();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [filter, setFilter] = useState<DashboardFilter>({
    mode: "all",
  });

  const categoryName =
    filter.mode === "category" && filter.categoryId
      ? categories.find((c: any) => c.id === filter.categoryId)?.name
      : undefined;

  useEffect(() => {
    if (!isLoading && (!user || error)) {
      router.replace("/login");
    }
  }, [user, isLoading, error, router]);
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
        <Sidebar
          filter={filter}
          onChange={setFilter}
          onAddTask={() => setOpenTaskModal(true)}
        />

        <section
          className="
    relative
    flex-1
    overflow-y-auto
    px-5 lg:px-14
    pt-4 lg:py-8
  "
        >
          {/* MOBILE HEADER */}
          <div className="lg:hidden mb-3">
            <div className="flex justify-end mb-3">
              <UserProfile mobile email={user.email} />
            </div>

            <GreetingHeader name={user.name} />

            <div className="flex items-center justify-end gap-1">
              <EditIcon className="w-6 h-6" />

              <MobileSidebar>
                <SidebarMenu
                  email={user.email}
                  filter={filter}
                  onAddTask={() => setOpenTaskModal(true)}
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
          <AddTaskModal
            open={openTaskModal}
            onClose={() => setOpenTaskModal(false)}
          />
          <div className="w-full max-w-[980px]">
            {/* DESKTOP GREETING (category -> hide) */}
            {filter.mode !== "category" && (
              <div className="hidden lg:block">
                <GreetingHeader name={user.name} />
              </div>
            )}

            {/*  DESKTOP CALENDAR (category -> hide) */}
            {filter.mode !== "category" && (
              <div className="hidden lg:block">
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
            <div className="lg:hidden">
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
              <div className="lg:hidden mt-4">
                <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <CategoryChip
                    label="All"
                    active={filter.categoryId === undefined}
                    onClick={() =>
                      setFilter({
                        mode: "category",
                        categoryId: undefined,
                      })
                    }
                  />

                  {categories.map((cat: any) => (
                    <CategoryChip
                      key={cat.id}
                      label={cat.name}
                      active={filter.categoryId === cat.id}
                      onClick={() =>
                        setFilter({
                          mode: "category",
                          categoryId: cat.id,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            <TasksSection
              title={title}
              onAddTask={() => setOpenTaskModal(true)}
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
              onMobileFilter={(mode) => {
                if (mode === "today") {
                  setFilter({
                    mode: "today",
                    date: new Date().toISOString().slice(0, 10),
                  });
                }

                if (mode === "all") {
                  setFilter({
                    mode: "all",
                  });
                }
              }}
            />
          </div>
        </section>
        <FloatingAddButton onClick={() => setOpenTaskModal(true)} />
      </div>
    </main>
  );
}
