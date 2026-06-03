"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";
import { isGuestMode } from "@/hooks/useGuestMode";
import { createGuestTask } from "@/utils/guestSession";

interface CreateSubtask {
  title: string;
}

interface CreateTaskData {
  title: string;

  description?: string;

  dueDate?: string;

  estimatedDuration?: number;

  categoryId?: string;

  subtasks?: CreateSubtask[];
}

async function createTask(data: CreateTaskData) {
  if (isGuestMode()) {
    return Promise.resolve(createGuestTask(data));
  }

  const res = await axiosInstance.post("/api/task/taskLists", data);
  return res.data;
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["guestTasks"],
      });
    },
  });

  return {
    createTask: mutation.mutateAsync,

    isCreating: mutation.isPending,

    error: mutation.error,
  };
}
