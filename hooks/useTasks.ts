"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

async function fetchTasks(categoryId?: string) {
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
  } = useQuery({
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
