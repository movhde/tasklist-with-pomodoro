"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { isGuestMode } from "@/hooks/useGuestMode";

async function fetchCategories() {
  const res = await axiosInstance.get("/api/task/categories");
  return res.data;
}

export function useCategories() {
  const guestMode = isGuestMode();

  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: !guestMode,
  });

  return {
    categories: guestMode ? [] : categories,
    isLoading: guestMode ? false : isLoading,
    error: guestMode ? null : error,
    refetchCategories: refetch,
  };
}
