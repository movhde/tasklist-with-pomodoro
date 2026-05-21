"use client";

import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

import { TaskWithCategory } from "@/types/task";

async function fetchTasks(categoryId?: string): Promise<TaskWithCategory[]> {
  const url = categoryId
    ? `/api/task/taskLists?categoryId=${categoryId}`
    : "/api/task/taskLists";

  const res = await axiosInstance.get(url);

  return res.data;
}

export function useTasks(selectedCategoryId?: string) {
  const {
    data: tasks = [],

    isLoading,

    error,

    refetch,
  } = useQuery<TaskWithCategory[]>({
    queryKey: ["tasks", selectedCategoryId],

    queryFn: () => fetchTasks(selectedCategoryId),
  });

  return {
    tasks,

    isLoading,

    error,

    refetchTasks: refetch,
  };
}
