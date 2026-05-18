"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

async function fetchCategories() {
  const res = await axiosInstance.get("/api/task/categories");
  return res.data;
}

export function useCategories() {
  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return {
    categories,
    isLoading,
    error,
    refetchCategories: refetch,
  };
}
