"use client";

import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useTasks } from "@/hooks/useTasks";

import CategorySearch from "./CategorySearch";
import CategoryList from "./CategoryList";
import CompletionChart from "./CompletionChart";
import { TaskCategory } from "@/types/task";

export default function AnalyticsSection() {
  const { categories } = useCategories();

  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const { tasks } = useTasks(selectedCategoryId);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return categories;

    return categories.filter((c: TaskCategory) =>
      c.name.toLowerCase().includes(q),
    );
  }, [categories, search]);

  return (
    <div className="flex h-full flex-col lg:items-end gap-5 lg:grid lg:grid-cols-[35%_65%]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#303153] dark:text-white">
            Your completion rate
          </h2>
        </div>

        <CategorySearch value={search} onChange={setSearch} />

        <CategoryList
          categories={filteredCategories}
          selectedId={selectedCategoryId}
          onSelect={(id) => setSelectedCategoryId(id)}
        />
      </div>

      <div className="min-h-0 flex items-center">
        <CompletionChart tasks={tasks} />
      </div>
    </div>
  );
}
