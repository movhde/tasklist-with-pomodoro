"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { TaskWithCategory } from "@/types/task";
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer";
import { SessionInfo } from "./SessionInfo";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";

const DEFAULT_DURATION = 25;

export function PomodoroTimer() {
  const [selectedTask, setSelectedTask] = useState<TaskWithCategory | null>(
    null,
  );
  const [started, setStarted] = useState(false);

  const taskDuration = selectedTask?.estimatedDuration ?? DEFAULT_DURATION;

  const {
    timeLeft,
    totalTime,
    isRunning,
    sessionType,
    workCycles,
    totalSessions,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
    handleAddSession,
  } = usePomodoroTimer({
    taskDuration,
    onComplete: handleAllSessionsDone,
  });

  function handleSelectTask(task: TaskWithCategory) {
    if (isRunning) return;
    setSelectedTask(task);
    setStarted(false);
  }

  function handleStart_() {
    setStarted(true);
    handleStart();
  }

  function handleReset_() {
    setStarted(false);
    handleReset();
  }

  return (
    <div className="w-full flex flex-col items-start gap-6">
      <SessionInfo
        sessionType={sessionType}
        cycles={workCycles}
        categoryName={selectedTask?.category?.name ?? undefined}
      />

      <div
        className="px-10 py-6 bg-white rounded-4xl flex items-center gap-4 w-full dark:bg-[#31304A]"
        style={{
          boxShadow: "5px 5px 8px 0px #DBF2FC, -5px -5px 16px 0px #E5F6FE",
        }}
      >
        <div className="flex flex-col items-center w-1/2">
          <TimerDisplay timeLeft={timeLeft} totalTime={totalTime} />

          {started && (
            <p className="text-xs text-[#6D7085] mt-2">
              Cycle {workCycles} of {totalSessions}
            </p>
          )}

          <TimerControls
            isRunning={isRunning}
            showSettings={!started}
            onStart={handleStart_}
            onPause={handlePause}
            onReset={handleReset_}
          />
        </div>

        <div className="relative w-1/2 h-80">
          <Image src="/images/House-restyling-cuate.svg" alt="svg" fill />
        </div>
      </div>
    </div>
  );
}
