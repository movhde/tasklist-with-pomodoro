// components/pomodoro/PomodoroTimer.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TaskWithCategory } from "@/types/task";
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer";
import { useSound } from "@/hooks/useSound";
import { SessionInfo } from "./SessionInfo";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { TaskSelector } from "./TaskSelector";
import { TaskPanel } from "./TaskPanel";
import { CompletionModal } from "./CompletionModal";
import { MusicButton } from "./MusicButton";

const DEFAULT_DURATION = 25;

const CATEGORY_IMAGE: Record<string, string> = {
  work: "/images/work.svg",
  personal: "/images/personal.svg",
  gym: "/images/gym.svg",
  home: "/images/home.svg",
  study: "/images/study.svg",
  other: "/images/other.svg",
};
const DEFAULT_IMAGE = "/images/other.svg";

function getCategoryImage(categoryName?: string | null): string {
  if (!categoryName) return DEFAULT_IMAGE;
  return CATEGORY_IMAGE[categoryName.toLowerCase()] ?? DEFAULT_IMAGE;
}

export function PomodoroTimer() {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<TaskWithCategory | null>(
    null,
  );
  const [started, setStarted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const taskDuration = selectedTask?.estimatedDuration ?? DEFAULT_DURATION;
  const vectorImage = getCategoryImage(selectedTask?.category?.name);

  const handleAllSessionsDone = useCallback(() => {
    setShowCompletion(true);
  }, []);

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
  } = usePomodoroTimer({ taskDuration, onComplete: handleAllSessionsDone });

  const {
    selectedTrack,
    volume,
    setVolume,
    handleSelectTrack,
    playBell,
    stopAll,
  } = useSound({
    sessionType,
    isRunning,
  });

  useEffect(() => {
    if (timeLeft === 1 && started) {
      playBell();
    }
  }, [timeLeft]);

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
    setShowCompletion(false);
    stopAll();
    handleReset();
  }

  function handleManualComplete() {
    stopAll();
    handleStop();
    handleReset();
    setStarted(false);
    setShowCompletion(false);
    setSelectedTask(null);
  }

  async function handleModalComplete() {
    if (selectedTask) {
      const token = localStorage.getItem("token");
      await fetch(`/api/task/taskLists/${selectedTask.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: true }),
      });
    }
    stopAll();
    handleStop();
    handleReset();
    setShowCompletion(false);
    setStarted(false);
    setSelectedTask(null);
  }

  function handleAddMore() {
    setShowCompletion(false);
    handleAddSession();
  }

  return (
    <div className="w-full flex flex-col md:items-start items-center gap-6">
      <div className="w-full flex md:flex-row flex-col justify-between gap-2">
        <SessionInfo
          sessionType={sessionType}
          cycles={workCycles}
          totalSessions={totalSessions}
          categoryName={selectedTask?.category?.name ?? undefined}
        />
        <div className="w-full md:w-fit flex justify-between items-center">
          <Image
            src={"/icons/back-button.svg"}
            alt="back button icon"
            width={18}
            height={18}
            onClick={() => router.back()}
            className="md:hidden flex items-center w-10 max-h-9 p-2 rounded-[20px] border-[1.5px] border-[#59B7FF] bg-[#EEF5FF]/85 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:bg-[#EEF5FF]"
          />
          <MusicButton
            selectedTrack={selectedTrack}
            volume={volume}
            onSelectTrack={handleSelectTrack}
            onVolumeChange={setVolume}
          />
        </div>
      </div>

      <div
        className="px-10 py-6 bg-white rounded-4xl flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full dark:bg-[#31304A]"
        style={{
          boxShadow: "5px 5px 8px 0px #DBF2FC, -5px -5px 16px 0px #E5F6FE",
        }}
      >
        <div className="flex flex-col items-center xl:w-1/2 w-full gap-4">
          <TimerDisplay timeLeft={timeLeft} totalTime={totalTime} />
          <TimerControls
            isRunning={isRunning}
            showSettings={!started}
            onStart={handleStart_}
            onPause={handlePause}
            onReset={handleReset_}
          />
        </div>

        <div className="flex flex-col relative w-full lg:w-1/2 h-full">
          <div className="min-h-50 relative flex-1">
            <Image
              src={vectorImage}
              alt={selectedTask?.category?.name ?? "pomodoro"}
              fill
              className="object-contain transition-all duration-500"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        {!started && (
          <TaskSelector
            selectedTaskId={selectedTask?.id}
            onSelect={handleSelectTask}
          />
        )}

        {selectedTask && started && (
          <TaskPanel
            task={selectedTask}
            onTaskCompleted={handleManualComplete}
          />
        )}
      </div>

      <CompletionModal
        open={showCompletion}
        onComplete={handleModalComplete}
        onAddSession={handleAddMore}
      />
    </div>
  );
}
