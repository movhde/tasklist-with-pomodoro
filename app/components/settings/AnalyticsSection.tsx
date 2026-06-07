"use client";

import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useTasks } from "@/hooks/useTasks";

import CategorySearch from "./CategorySearch";
import CategoryList from "./CategoryList";
import CompletionChart from "./CompletionChart";

export default function AnalyticsSection() {
  const { categories } = useCategories();
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(
    undefined,
  );

  const { tasks } = useTasks(selectedCategoryId);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, search]);

  return (
    <div className="grid gap-6 lg:grid-cols-[35%_65%]">
      <div className="space-y-4">
        <div>
          <h2 className="text-[16px] font-semibold text-[#303153] dark:text-white">
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

      <div className="rounded-[24px] bg-white/0">
        <CompletionChart tasks={tasks} />
      </div>
    </div>
  );
}

