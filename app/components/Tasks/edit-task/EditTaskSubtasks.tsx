"use client";

import { Plus } from "lucide-react";

import EditableSubtaskItem from "./EditableSubtaskItem";

import { Subtask } from "@/types/task";

interface Props {
  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
}

export default function EditTaskSubtasks({ subtasks, setSubtasks }: Props) {
  function addSubtask() {
    setSubtasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        completed: false,
      },
    ]);
  }

  function updateSubtask(id: string, title: string) {
    setSubtasks((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              title,
            }
          : s,
      ),
    );
  }

  function removeSubtask(id: string) {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div
      className="
      rounded-[24px]
      border-2 border-dashed
      border-[#59B7FF]/16
      bg-[#FCFDFF]/70
      p-5
      dark:bg-[#2F3047]/40
    "
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-semibold dark:text-white">
            Subtasks
          </h3>

          <p className="mt-1 text-[12px] text-[#8C95B2]">
            Manage your task steps
          </p>
        </div>

        <button
          onClick={addSubtask}
          className="
            flex items-center gap-2
            rounded-full
            bg-[#59B7FF]
            px-3 py-2
            text-white
          "
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {subtasks.map((subtask) => (
          <EditableSubtaskItem
            key={subtask.id}
            value={subtask.title}
            onChange={(title) => updateSubtask(subtask.id, title)}
            onDelete={() => removeSubtask(subtask.id)}
          />
        ))}
      </div>
    </div>
  );
}
