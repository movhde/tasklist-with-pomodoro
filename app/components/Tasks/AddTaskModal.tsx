// components/Tasks/AddTaskModal.tsx

"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios";

import { useCategories } from "@/hooks/useCategories";

import { Subtask } from "@/types/task";

import {
  CalendarDays,
  Clock3,
  Plus,
  ListPlus,
  StickyNote,
  X,
  Trash2,
} from "lucide-react";

import CategoryChip from "@/app/components/ui/category-chip";
import ModalInput from "@/app/components/ui/modal-input";
import TimePicker from "@/app/components/ui/time-picker";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();

  const { categories } = useCategories();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [estimatedDuration, setEstimatedDuration] = useState<number | null>(
    null,
  );

  const [categoryId, setCategoryId] = useState("");

  const [subtaskInput, setSubtaskInput] = useState("");

  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  const createTask = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/api/task/taskLists", {
        title,
        description: description || null,
        dueDate: dueDate || null,
        estimatedDuration,
        categoryId: categoryId || null,
        subtasks,
      });

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setEstimatedDuration(null);
      setCategoryId("");
      setSubtaskInput("");
      setSubtasks([]);

      onClose();
    },
  });

  function addSubtask() {
    if (!subtaskInput.trim()) return;

    setSubtasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: subtaskInput,
        completed: false,
        duration: 0,
      },
    ]);

    setSubtaskInput("");
  }

  function removeSubtask(id: string) {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-6 backdrop-blur-[3px]">
      <div className="relative w-full max-w-[760px] max-h-[88vh] overflow-y-auto rounded-[34px] border border-white/20 bg-gray-100 shadow-[0_20px_70px_rgba(0,0,0,0.18)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-[#2B2D42]/95 animate-in fade-in zoom-in-95 duration-200">
        <div className="pointer-events-none absolute inset-0 rounded-[34px] " />

        <div className="relative z-10 p-4 md:p-5">
          {/* HEADER */}

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[22px] bg-gradient-to-br from-[#EEF5FF] to-[#FCEEF5] shadow-[0_10px_24px_rgba(15,23,42,.06)]">
                <ListPlus size={24} className="text-[#7D8DF7]" />
              </div>

              <div>
                <h2 className="text-[32px] font-semibold tracking-tight text-[#252842] dark:text-white">
                  Create task
                </h2>

                <p className="mt-1 text-[14px] text-[#7B8096] dark:text-[#BFC3D4]">
                  Organize your workflow beautifully
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center rounded-full border border-black/5 bg-[#F4F7FB] transition-all duration-200 hover:rotate-90 hover:scale-105 hover:bg-[#E9EEF5] dark:bg-[#3A3C57] dark:hover:bg-[#4A4C69]"
            >
              <X size={18} className="text-[#303153] dark:text-white" />
            </button>
          </div>

          {/* BODY */}

          <div className="mt-4 space-y-6">
            {/* TITLE */}

            <div>
              <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
                Task title
              </label>

              <ModalInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Study for math exam..."
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
                Description
              </label>

              <div
                className="rounded-[26px] border border-[#E8EEF7] bg-[#F8FAFD] p-2
               shadow-[0_4px_14px_rgba(15,23,42,.04)] dark:border-[#FFFFFF10] dark:bg-[#363750]"
              >
                <div className="flex gap-3">
                  <div
                    className="pl-2 flex h-8 w-8 
                  items-center justify-center rounded-full bg-[#EEF5FF] dark:bg-[#434560]"
                  >
                    <StickyNote size={18} className="text-[#7B84B2]" />
                  </div>

                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write something..."
                    className="w-full resize-none bg-transparent text-[15px] text-[#303153] outline-none placeholder:text-[#9EA3B5] dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* DATE + TIME */}

            <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-3 flex items-center gap-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
                  <CalendarDays size={14} stroke="#5B8CFF" />
                  Due date
                </label>

                <ModalInput
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div>
                <label
                  className="mb-3 flex items-center px-2 
                gap-2 text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]"
                >
                  <Clock3 stroke="#5B8CFF" size={14} />
                  Focus time
                </label>

                <TimePicker
                  value={estimatedDuration}
                  onChange={setEstimatedDuration}
                />
              </div>
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-3 block text-[13px] font-medium text-[#5B6078] dark:text-[#D7D9E4]">
                Category
              </label>

              <div className="flex flex-wrap gap-2.5">
                {categories.map((category: any) => (
                  <CategoryChip
                    key={category.id}
                    label={category.name}
                    active={categoryId === category.id}
                    onClick={() => setCategoryId(category.id)}
                  />
                ))}
              </div>
            </div>

            {/* SUBTASK */}

            <div className="rounded-[24px] border-2 border-dashed border-[#59B7FF]/16 bg-[#FCFDFF]/70 p-5 dark:border-[#FD81B0]/14 dark:bg-[#2F3047]/40">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-semibold text-[#404868] dark:text-white">
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

              <div className="mt-4 flex gap-2 justify-between items-center">
                <ModalInput
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  placeholder="Add subtask..."
                />

                <button
                  onClick={addSubtask}
                  className="flex h-10 items-center gap-2 cursor-pointer rounded-[22px] bg-[#59B7FF] px-4 font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {subtasks.length > 0 && (
                <div className="mt-4 space-y-2">
                  {subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center justify-between rounded-[18px] border border-black/5 bg-white/70 px-4 py-3 dark:bg-[#363750]"
                    >
                      <span className="text-[14px] text-[#303153] dark:text-white">
                        {subtask.title}
                      </span>

                      <button
                        onClick={() => removeSubtask(subtask.id)}
                        className="text-[13px] text-red-500 transition-all duration-200 hover:text-red-600"
                      >
                        <Trash2 className="text-red-500 cursor-pointer hover:text-red-700 transition-colors" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-end gap-3 border-t border-black/5 pt-5">
              <button
                onClick={onClose}
                className="rounded-[20px] cursor-pointer border border-black/5 bg-[#F4F7FB] px-6 py-3 text-[#303153] transition-all duration-200 hover:bg-[#EAEFF5] dark:bg-[#363750] dark:text-white"
              >
                Cancel
              </button>

              <button
                disabled={!title || createTask.isPending}
                onClick={() => createTask.mutate()}
                className="flex items-center gap-2 cursor-pointer rounded-[20px] bg-gradient-to-r from-[#5DAEFF] via-[#7D8DF7] to-[#E58AB2] px-8 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(89,183,255,.20)] transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
              >
                <Plus size={16} />

                {createTask.isPending ? "Creating..." : "Create task"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
