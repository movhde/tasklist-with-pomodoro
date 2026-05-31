"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import EditableSubtaskItem from "./EditableSubtaskItem";
import { Subtask } from "@/types/task";
import ModalInput from "@/app/components/ui/modal-input";

interface Props {
  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
}

export default function EditTaskSubtasks({ subtasks, setSubtasks }: Props) {
  const [subtaskInput, setSubtaskInput] = useState("");

  function addSubtask() {
    if (!subtaskInput.trim()) return;

    setSubtasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: subtaskInput,
        completed: false,
      },
    ]);

    setSubtaskInput("");
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
    const element = document.getElementById(`edit-subtask-${id}`);

    if (element) {
      element.classList.add("subtask-exit");
      setTimeout(() => {
        setSubtasks((prev) => prev.filter((s) => s.id !== id));
      }, 200);
    } else {
      setSubtasks((prev) => prev.filter((s) => s.id !== id));
    }
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
            Split big tasks into smaller steps
          </p>
        </div>

        <span className="rounded-full bg-[#59B7FF]/10 px-3 py-1 text-[11px] font-medium text-[#59B7FF]">
          Optional
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <ModalInput
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          placeholder="Add subtask..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSubtask();
            }
          }}
        />

        <button
          onClick={addSubtask}
          className="flex h-10 cursor-pointer items-center gap-2 rounded-[22px] bg-[#59B7FF] px-4 font-medium text-white transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {subtasks.length > 0 && (
        <div className="mt-4 space-y-2">
          {subtasks.map((subtask) => (
            <EditableSubtaskItem
              key={subtask.id}
              id={subtask.id}
              value={subtask.title}
              onChange={(title) => updateSubtask(subtask.id, title)}
              onDelete={() => removeSubtask(subtask.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
