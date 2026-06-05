"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import ModalInput from "@/app/components/ui/modal-input";

import { Subtask } from "@/types/task";

import SubtaskItem from "./SubtaskItem";

interface Props {
  subtasks: Subtask[];
  setSubtasks: React.Dispatch<React.SetStateAction<Subtask[]>>;
}

export default function TaskSubtasksSection({ subtasks, setSubtasks }: Props) {
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

  function removeSubtask(id: string) {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  }

  return (
    <div
      className="
rounded-[24px]
border-3
md:border-2
border-dashed
border-[#FFB6D3]
md:border-[#59B7FF]/16
bg-[#FCFDFF]/70
p-5
dark:border-[#3AAFF8]
md:dark:border-[#FD81B0]/14
dark:bg-[#2F3047]/40
"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sniglet text-[14px] font-semibold text-[#404868] dark:text-white">
            Subtasks
          </h3>

          <p className="font-sniglet mt-1 text-[12px] text-[#8C95B2]">
            Split big tasks into smaller steps
          </p>
        </div>

        <span className="font-sniglet rounded-full bg-[#ffb6d32e] md:bg-[#59B7FF]/10 px-3 py-1 text-[11px] font-medium text-[#ea75a4] md:text-[#59B7FF]">
          Optional
        </span>
      </div>

      <div className="font-sniglet mt-4 flex items-center justify-between gap-2">
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
          className="font-sniglet flex h-10 cursor-pointer items-center gap-2 rounded-[22px] bg-[#59B7FF] px-4 font-medium text-white transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {subtasks.length > 0 && (
        <div className="mt-4 space-y-2">
          {subtasks.map((subtask) => (
            <SubtaskItem
              key={subtask.id}
              subtask={subtask}
              onDelete={() => {
                const element = document.getElementById(
                  `subtask-${subtask.id}`,
                );

                if (element) {
                  element.classList.remove("subtask-enter");

                  element.classList.add("subtask-exit");

                  setTimeout(() => {
                    removeSubtask(subtask.id);
                  }, 200);
                } else {
                  removeSubtask(subtask.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
