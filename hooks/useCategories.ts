"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { isGuestMode } from "@/hooks/useGuestMode";
import { TaskCategory } from "@/types/task";

const DEFAULT_GUEST_CATEGORIES: TaskCategory[] = [
  { id: "guest-work", name: "Work", userId: "guest", createdAt: null },
  { id: "guest-personal", name: "Personal", userId: "guest", createdAt: null },
  { id: "guest-gym", name: "Gym", userId: "guest", createdAt: null },
  { id: "guest-home", name: "Home", userId: "guest", createdAt: null },
  { id: "guest-study", name: "Study", userId: "guest", createdAt: null },
  { id: "guest-other", name: "Other", userId: "guest", createdAt: null },
];

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

  if (guestMode) {
    return {
      categories: DEFAULT_GUEST_CATEGORIES,
      isLoading: false,
      error: null,
      refetchCategories: () => {},
    };
  }

  return {
    categories,
    isLoading,
    error,
    refetchCategories: refetch,
  };
}
