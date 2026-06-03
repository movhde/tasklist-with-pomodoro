import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";
import { isGuestMode } from "@/hooks/useGuestMode";

async function fetchUser() {
  const res = await apiClient.get("/api/auth/me");
  return res.data.user;
}

export function useUser() {
  const queryClient = useQueryClient();
  const guestMode = isGuestMode();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: Infinity,
    retry: false,
    enabled: !guestMode,
  });

  return {
    user: guestMode
      ? { id: "guest", email: "Guest" }
      : (data ?? queryClient.getQueryData(["user"])),
    isLoading: guestMode ? false : isLoading,
    error: guestMode ? null : error,
  };
}
