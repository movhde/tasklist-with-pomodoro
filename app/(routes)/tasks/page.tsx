"use client";

import { useState } from "react";
import Header from "@/app/components/Layout/Header";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";
import { useUser } from "@/hooks/useUser";

function TaskCard({ task }: { task: any }) {
  const isCompleted = task.completed;

  return (
    <div className="group bg-white dark:bg-[#2A2B44] rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-3">
        {/* Task status */}
        <div
          className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 transition-all
            ${
              isCompleted
                ? "bg-green-500 border-green-500"
                : "border-gray-400 dark:border-gray-500"
            }`}
        >
          {isCompleted && (
            <svg
              className="w-4 h-4 text-white mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>

        <div className="flex-1">
          <h3
            className={`font-bold text-lg text-[#303153] dark:text-white break-words
            ${isCompleted && "line-through text-gray-500 dark:text-gray-400"}`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Labels */}
          <div className="flex flex-wrap gap-2 mt-3">
            {task.category && (
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {task.category.name}
              </span>
            )}
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                📅 {new Date(task.dueDate).toLocaleDateString("en-US")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const { user, isLoading: userLoading } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useTasks(selectedCategory || undefined);
  const { categories, isLoading: categoriesLoading } = useCategories();

  if (userLoading || tasksLoading || categoriesLoading) {
    return (
      <main className="min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="font-sniglet text-xl dark:text-white">Loading...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Please wait
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (tasksError) {
    return (
      <main className="min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180">
        <Header />
        <div className="flex items-center justify-center h-96 px-4">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-800 rounded-lg p-6 max-w-md">
            <h2 className="text-red-600 dark:text-red-400 font-bold text-lg">
              ❌ Error
            </h2>
            <p className="text-red-500 dark:text-red-300 mt-2">
              {tasksError.message}
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-[161deg] from-20% from-[#FFF1E6] via-35% via-[#F3E6FA] to-125% to-[#C9B1F6] dark:bg-linear-180">
      <Header />

      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <h1 className="font-sniglet font-extrabold text-3xl md:text-4xl text-[#303153] dark:text-white mb-6">
          My Tasks
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full font-sniglet text-sm font-bold transition-all
              ${
                !selectedCategory
                  ? "bg-[#FF8BA6] text-white shadow-md"
                  : "bg-white dark:bg-[#32334B] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3D3E58]"
              }`}
          >
            All
          </button>
          {categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-sniglet text-sm font-bold transition-all
                ${
                  selectedCategory === cat.id
                    ? "bg-[#FF8BA6] text-white shadow-md"
                    : "bg-white dark:bg-[#32334B] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3D3E58]"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {tasks.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-white dark:bg-[#32334B] rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <h3 className="font-sniglet text-2xl font-bold text-[#303153] dark:text-white mb-2">
                No Tasks Yet!
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedCategory
                  ? `No tasks in "${categories.find((c: any) => c.id === selectedCategory)?.name}" category`
                  : "You don't have any tasks yet"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task: any) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}

        {tasks.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Showing {tasks.length} task{tasks.length !== 1 ? "s" : ""}
            {selectedCategory &&
              categories.find((c: any) => c.id === selectedCategory) &&
              ` in "${categories.find((c: any) => c.id === selectedCategory)?.name}" category`}
          </div>
        )}
      </div>
    </main>
  );
}
