// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useCategories } from "@/hooks/useCategories";
import { MainLayout } from "@/app/components/dashboard/MainLayout";
import TasksSection from "@/app/components/dashboard/TasksSection";
import WeekCalendar from "@/app/components/dashboard/WeekCalendar";
import CategoryChip from "@/app/components/ui/category-chip";
import AddTaskModal from "@/app/components/Tasks/add-task/add-task-modal/AddTaskModal";
import SearchInput from "@/app/components/ui/SearchInput";
import GreetingHeader from "@/app/components/dashboard/GreetingHeader";
import { Filter } from "@/app/components/dashboard/sidebarConfig";
import { TaskCategory } from "@/types/task";

export default function DashboardPage() {
  const { user } = useUser();
  const { categories } = useCategories();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [filter, setFilter] = useState<Filter>({ mode: "all" });
  const [search, setSearch] = useState("");

  const isCategoryMode = filter.mode === "category";

  const taskDate =
    filter.mode === "today"
      ? new Date().toISOString().slice(0, 10)
      : filter.mode === "calendar"
        ? filter.date
        : undefined;

  return (
    <MainLayout
      email={user?.email}
      filter={filter}
      onFilterChange={setFilter}
      onAddTask={() => setOpenTaskModal(true)}
      search={search}
      onSearchChange={setSearch}
    >
      <div className="max-w-[980px]">
        {/* Desktop Search */}
        <div className="hidden lg:block mb-6 max-w-[760px]">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        {!isCategoryMode && (
          <div className="hidden lg:block">
            <GreetingHeader email={user?.email} />
          </div>
        )}

        {/* Calendar */}
        {!isCategoryMode && (
          <WeekCalendar
            selected={filter.date}
            onChange={(date) => {
              setFilter(date ? { mode: "calendar", date } : { mode: "all" });
            }}
          />
        )}

        {/* Mobile Category Chips */}
        {isCategoryMode && (
          <div className="lg:hidden mt-4">
            <div className="flex gap-2 overflow-x-auto">
              <CategoryChip
                label="All"
                active={!filter.categoryId}
                onClick={() =>
                  setFilter({ mode: "category", categoryId: undefined })
                }
              />
              {categories.map((cat: TaskCategory) => (
                <CategoryChip
                  key={cat.id}
                  label={cat.name}
                  active={filter.categoryId === cat.id}
                  onClick={() =>
                    setFilter({ mode: "category", categoryId: cat.id })
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Tasks */}
        <TasksSection
          title="Your Tasks"
          search={search}
          onAddTask={() => setOpenTaskModal(true)}
          categoryId={isCategoryMode ? filter.categoryId : undefined}
          date={taskDate}
        />
      </div>

      <AddTaskModal
        open={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
      />
    </MainLayout>
  );
}
