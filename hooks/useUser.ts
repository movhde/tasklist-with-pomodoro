import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios";

async function fetchUser() {
  const res = await apiClient.get("/api/auth/me");
  return res.data.user;
}

export function useUser() {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData(["user"]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: Infinity,
    enabled: !!localStorage.getItem("token"),
  });

  return { user: data || cachedUser, isLoading, error };
}
