"use client";

import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { isGuestMode } from "@/hooks/useGuestMode";
import { getGuestTasks } from "@/utils/guestSession";

import { TaskWithCategory } from "@/types/task";

async function fetchTasks(
  categoryId?: string,
  date?: string,
): Promise<TaskWithCategory[]> {
  const params = new URLSearchParams();

  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  if (date) {
    params.set("date", date);
  }

  const query = params.toString();

  const url = query ? `/api/task/taskLists?${query}` : "/api/task/taskLists";

  const res = await axiosInstance.get(url);

  return res.data;
}

function fetchGuestTasks(
  categoryId?: string,
  date?: string,
): Promise<TaskWithCategory[]> {
  const tasks = getGuestTasks();

  const filteredByCategory = categoryId
    ? tasks.filter((task) => task.categoryId === categoryId)
    : tasks;

  if (!date) {
    return Promise.resolve(filteredByCategory);
  }

  const normalizedDate = date.slice(0, 10);
  const filteredByDate = filteredByCategory.filter((task) => {
    if (!task.dueDate) return false;
    return task.dueDate.slice(0, 10) === normalizedDate;
  });

  return Promise.resolve(filteredByDate);
}

export function useTasks(selectedCategoryId?: string, selectedDate?: string) {
  const guestMode = isGuestMode();

  const query = useQuery<TaskWithCategory[]>({
    queryKey: guestMode
      ? ["guestTasks", selectedCategoryId, selectedDate]
      : ["tasks", selectedCategoryId, selectedDate],
    queryFn: guestMode
      ? () => fetchGuestTasks(selectedCategoryId, selectedDate)
      : () => fetchTasks(selectedCategoryId, selectedDate),
  });

  return {
    tasks: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetchTasks: query.refetch,
  };
}
