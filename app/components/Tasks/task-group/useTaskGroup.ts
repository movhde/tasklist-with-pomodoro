"use client";

import { useMemo, useState } from "react";

import { TaskWithCategory } from "@/types/task";
import { getTaskProgress } from "@/utils/taskProgress";
import { useQueryClient } from "@tanstack/react-query";
import { isGuestMode } from "@/hooks/useGuestMode";
import {
  deleteGuestTask,
  toggleGuestSubtask,
  updateGuestTask,
} from "@/utils/guestSession";
export default function useTaskGroup(task: TaskWithCategory) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [taskState, setTaskState] = useState<TaskWithCategory>(task);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const { progress, completed, done, total } = useMemo(
    () => getTaskProgress(taskState),
    [taskState],
  );
  const queryClient = useQueryClient();
  const guestMode = isGuestMode();

  async function toggleTask() {
    const updatedCompleted = !taskState.completed;

    const updatedSubtasks =
      taskState.subtasks?.map((subtask) => ({
        ...subtask,
        completed: updatedCompleted,
      })) || [];

    const updatedTask: TaskWithCategory = {
      ...taskState,
      completed: updatedCompleted,
      subtasks: updatedSubtasks,
      category: taskState.category ?? null,
    };

    setTaskState(updatedTask);

    try {
      if (guestMode) {
        updateGuestTask(updatedTask);
        queryClient.invalidateQueries({ queryKey: ["guestTasks"] });
        return;
      }

      const token = localStorage.getItem("token");

      await fetch(`/api/task/taskLists/${task.id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          completed: updatedCompleted,
        }),
      });
    } catch {
      setTaskState(taskState);
    }
  }
  async function deleteTask() {
    try {
      setDeleteLoading(true);

      if (guestMode) {
        const removed = deleteGuestTask(task.id);
        if (removed) {
          queryClient.invalidateQueries({ queryKey: ["guestTasks"] });
        }
        return removed;
      }

      const token = localStorage.getItem("token");

      const res = await fetch(`/api/task/taskLists/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return false;
      }

      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      return true;
    } catch {
      return false;
    } finally {
      setDeleteLoading(false);
    }
  }

  async function toggleSubtask(subtaskId: string) {
    const previousTask = taskState;

    const updatedSubtasks =
      taskState.subtasks?.map((subtask) =>
        subtask.id === subtaskId
          ? {
              ...subtask,
              completed: !subtask.completed,
            }
          : subtask,
      ) || [];

    const allCompleted = updatedSubtasks.every((subtask) => subtask.completed);

    const updatedTask = {
      ...taskState,
      completed: allCompleted,
      subtasks: updatedSubtasks,
    };

    setTaskState(updatedTask);

    try {
      if (guestMode) {
        const result = toggleGuestSubtask(task.id, subtaskId, !taskState.subtasks?.find((st) => st.id === subtaskId)?.completed);
        if (result) {
          queryClient.invalidateQueries({ queryKey: ["guestTasks"] });
        } else {
          setTaskState(previousTask);
        }
        return;
      }

      const token = localStorage.getItem("token");

      const targetSubtask = updatedSubtasks.find(
        (subtask) => subtask.id === subtaskId,
      );

      const res = await fetch(
        `/api/task/taskLists/${task.id}/subtasks/${subtaskId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            completed: targetSubtask?.completed,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
    } catch {
      setTaskState(previousTask);
    }
  }

  return {
    taskState,
    setTaskState,

    open,
    setOpen,

    editOpen,
    setEditOpen,

    progress,
    completed,
    done,
    total,

    toggleTask,
    toggleSubtask,

    deleteTask,

    deleteOpen,
    setDeleteOpen,

    deleteLoading,
  };
}
