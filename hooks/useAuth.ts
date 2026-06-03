"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";
import { AuthResponse, LoginRequest, SignupRequest } from "@/types/auth";
import { useState } from "react";
import { AxiosError } from "axios";

async function loginRequest(data: LoginRequest): Promise<AuthResponse> {
  const res = await apiClient.post("/api/auth/login", data);
  return res.data;
}

async function signupRequest(data: SignupRequest): Promise<AuthResponse> {
  const res = await apiClient.post("/api/auth/signup", data);
  return res.data;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [authError, setAuthError] = useState<string | null>(null);

  const login = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuthError(null);
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = "guest_token=; path=/; max-age=0";
      document.cookie = "guest_mode=; path=/; max-age=0";
      queryClient.setQueryData(["user"], data.user);
      router.push("/dashboard");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Server error.";
      setAuthError(message);
    },
  });

  const signup = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      setAuthError(null);
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
      document.cookie = `just_signed_up=true; path=/; max-age=3600`;
      document.cookie = "guest_mode=; path=/; max-age=0";
      document.cookie = "guest_token=; path=/; max-age=0";
      queryClient.setQueryData(["user"], data.user);
      router.push("/signup/success");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "Server error.";
      setAuthError(message);
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "just_signed_up=; path=/; max-age=0";
    document.cookie = "guest_mode=; path=/; max-age=0";
    document.cookie = "guest_token=; path=/; max-age=0; sameSite=Lax";
    queryClient.clear();
    router.push("/");
  };

  return {
    login: login.mutateAsync,
    signup: signup.mutateAsync,
    logout,
    isLoading: login.isPending || signup.isPending,
    error: authError,
  };
}
