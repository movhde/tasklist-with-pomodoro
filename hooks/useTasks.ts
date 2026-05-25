"use client";

import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

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

export function useTasks(selectedCategoryId?: string, selectedDate?: string) {
  const {
    data: tasks = [],

    isLoading,

    error,

    refetch,
  } = useQuery<TaskWithCategory[]>({
    queryKey: ["tasks", selectedCategoryId, selectedDate],

    queryFn: () => fetchTasks(selectedCategoryId, selectedDate),
  });

  return {
    tasks,

    isLoading,

    error,

    refetchTasks: refetch,
  };
}
