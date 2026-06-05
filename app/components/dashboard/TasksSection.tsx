"use client";

import { useState } from "react";

import SearchInput from "../ui/SearchInput";

import TaskTimeline from "../Tasks/task-group/TaskTimeline";
import MobileTaskFilter from "./MobileTaskFilter";

interface Props {
  title: string;
  subtitle?: string;
  categoryId?: string;
  date?: string;
  onMobileFilter?: (mode: "all" | "today") => void;
  onAddTask: () => void;
}

export default function TasksSection({
  title,
  subtitle,
  categoryId,
  date,
  onMobileFilter,
  onAddTask,
}: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="mt-5 mb-22 flex flex-col items-start lg:mb-0">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-sniglet text-2xl font-bold text-[#303153] dark:text-white md:text-4xl">
          {title}
        </h1>

        <MobileTaskFilter onChange={(mode) => onMobileFilter?.(mode)} />
      </div>

      {subtitle && (
        <p className="font-sniglet pl-2 text-md text-gray-500 dark:text-[#C6C7D2]">
          {subtitle}
        </p>
      )}

      <div className="mt-5 w-full max-w-[760px]">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className="mt-4 w-full md:mt-8">
        <TaskTimeline
          categoryId={categoryId}
          date={date}
          search={search}
          onAddTask={onAddTask}
        />
      </div>
    </div>
  );
}
