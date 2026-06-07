"use client";

import { useMemo } from "react";
import { TaskWithCategory } from "@/types/task";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toLocalDateKey(date: Date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function startOfWeekISO(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function CompletionChart({
  tasks,
}: {
  tasks: TaskWithCategory[];
}) {
  const chart = useMemo(() => {
    const start = startOfWeekISO();
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return toLocalDateKey(d);
    });
    const values = days.map((day) => {
      const dayTasks = tasks.filter((task) => {
        if (!task.dueDate) return false;
        return task.dueDate.slice(0, 10) === day;
      });
      if (dayTasks.length === 0) return 0;
      const completedCount = dayTasks.filter((task) => task.completed).length;
      return Math.round((completedCount / dayTasks.length) * 100);
    });
    const labels = days.map((day) => {
      const date = new Date(`${day}T00:00:00`);
      return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        date,
      );
    });
    return { values, labels };
  }, [tasks]);

  const gradients = [
    "linear-gradient(180deg,#66C2FF 0%,#4AAFFF 100%)",
    "linear-gradient(180deg,#FD81B0 0%,#FF6AA1 100%)",
    "linear-gradient(180deg,#FCF4A3 0%,#FCF4A3 100%)",
    "linear-gradient(180deg,#9EDCFF 0%,#75C8FF 100%)",
    "linear-gradient(180deg,#66C2FF 0%,#4AAFFF 100%)",
    "linear-gradient(180deg,#FD81B0 0%,#FF6AA1 100%)",
    "linear-gradient(180deg,#FCF4A3 0%,#FCF4A3 100%)",
  ];

  return (
    <div className="relative h-[340px] lg:h-[340px] w-full overflow-hidden rounded-[28px] border border-[#DCE7F5] bg-white p-4 lg:p-6 dark:border-[#FFFFFF15] dark:bg-[#2E2F46] font-sniglet">
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-6 py-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="border-t border-[#E8EDF7] dark:border-[#FFFFFF10]"
          />
        ))}
      </div>
      <div className="relative h-full">
        <div className="flex h-full items-end justify-between gap-3 pb-6 pt-4">
          {chart.values.map((value, idx) => (
            <div
              key={idx}
              className="flex flex-1 flex-col items-center justify-end"
            >
              <div
                className="w-8 sm:w-10 lg:w-14 rounded-t-[18px] transition-all duration-500"
                style={{
                  height: `${Math.max(12, Math.round((value / 100) * 235))}px`,
                  background: gradients[idx],
                  opacity: value === 0 ? 0.2 : 1,
                  boxShadow: "0 8px 24px rgba(0,0,0,.08)",
                }}
              />
              <span className="mt-3 text-[13px] font-semibold text-[#303153] dark:text-white">
                {chart.labels[idx]}
              </span>
              <span className="mt-1 text-[11px] text-[#8E93A8] dark:text-[#A8A9BD]">
                {value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
