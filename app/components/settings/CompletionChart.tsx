"use client";

import { useMemo } from "react";
import { TaskWithCategory } from "@/types/task";

function dateOnly(dateStr: string) {
  return dateStr.slice(0, 10);
}

function startOfWeekISO(date = new Date()) {
  // Monday as first day of week
  const d = new Date(date);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  const diff = (day === 0 ? -6 : 1) - day; // move to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function CompletionChart({ tasks }: { tasks: TaskWithCategory[] }) {
  const chart = useMemo(() => {
    const start = startOfWeekISO(new Date());
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return dateOnly(d.toISOString());
    });

    const donePerDay = new Map<string, number>();
    days.forEach((d) => donePerDay.set(d, 0));

    tasks.forEach((t) => {
      const src = t.dueDate || t.createdAt;
      if (!src) return;
      const d = dateOnly(src);
      if (!donePerDay.has(d)) return;
      if (t.completed) donePerDay.set(d, (donePerDay.get(d) ?? 0) + 1);
    });

    const values = days.map((d) => donePerDay.get(d) ?? 0);
    const max = Math.max(1, ...values);

    const labels = days.map((d) => {
      const dt = new Date(d);
      return new Intl.DateTimeFormat("en", { weekday: "short" }).format(dt);
    });

    return { values, max, labels };
  }, [tasks]);

  const barColors = ["#FF7EB6", "#66C2FF"];

  return (
    <div className="relative h-[190px] w-full">
      {/* Grid */}
      <div className="absolute inset-0 flex flex-col justify-between py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="border-t border-[#EAEAEA] dark:border-[#FFFFFF10]"
          />
        ))}
      </div>

      {/* Y axis label */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[12px] font-semibold text-[#9B9B9B] dark:text-[#A8A9BD]">
        Week
      </div>

      <div className="relative h-full pl-10 pr-4">
        <div className="flex h-full items-end justify-between gap-6 pb-6 pt-4">
          {chart.values.map((value, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center justify-end">
              <div
                className="w-6 rounded-t-[10px]"
                style={{
                  height: `${Math.max(6, Math.round((value / chart.max) * 140))}px`,
                  backgroundColor: barColors[idx % barColors.length],
                  opacity: value === 0 ? 0.25 : 0.8,
                }}
              />
              <div className="mt-2 text-[12px] font-semibold text-[#303153] dark:text-white">
                {chart.labels[idx]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
