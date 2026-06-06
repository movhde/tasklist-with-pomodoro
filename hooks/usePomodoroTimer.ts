"use client";

import { useEffect, useState, useCallback } from "react";
import { SessionType } from "@/types/pomodoro";

const WORK_DURATION = 25;
const SHORT_BREAK = 5;
const LONG_BREAK = 15;
const LONG_BREAK_EVERY = 4;
const MIN_DURATION_FOR_BREAK = 25;

interface Session {
  type: SessionType;
  duration: number;
}

interface PomodoroState {
  sessions: Session[];
  currentIndex: number;
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  workCycles: number;
}

interface UsePomodoroTimerOptions {
  taskDuration: number;
  onComplete: () => void;
}

function buildSessions(taskDuration: number): Session[] {
  const sessions: Session[] = [];
  let remaining = taskDuration;
  let workCount = 0;
  const hasBreaks = taskDuration >= MIN_DURATION_FOR_BREAK;

  while (remaining > 0) {
    const workTime = Math.min(remaining, WORK_DURATION);
    sessions.push({ type: "work", duration: workTime });
    remaining -= workTime;
    workCount++;

    if (remaining <= 0 || !hasBreaks) break;

    const isLongBreak = workCount % LONG_BREAK_EVERY === 0;
    sessions.push({
      type: "break",
      duration: isLongBreak ? LONG_BREAK : SHORT_BREAK,
    });
  }

  return sessions;
}

export function usePomodoroTimer({
  taskDuration,
  onComplete,
}: UsePomodoroTimerOptions) {
  const [state, setState] = useState<PomodoroState>(() => {
    const sessions = buildSessions(taskDuration);
    return {
      sessions,
      currentIndex: 0,
      timeLeft: sessions[0].duration * 60,
      totalTime: sessions[0].duration * 60,
      isRunning: false,
      workCycles: 0,
    };
  });

  useEffect(() => {
    const sessions = buildSessions(taskDuration);
    setState({
      sessions,
      currentIndex: 0,
      timeLeft: sessions[0].duration * 60,
      totalTime: sessions[0].duration * 60,
      isRunning: false,
      workCycles: 0,
    });
  }, [taskDuration]);

  useEffect(() => {
    if (!state.isRunning) return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft > 1) {
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        }

        const currentSession = prev.sessions[prev.currentIndex];
        const isWork = currentSession.type === "work";
        const newWorkCycles = isWork ? prev.workCycles + 1 : prev.workCycles;
        const nextIndex = prev.currentIndex + 1;

        if (nextIndex >= prev.sessions.length) {
          onComplete();
          return {
            ...prev,
            timeLeft: 0,
            isRunning: false,
            workCycles: newWorkCycles,
          };
        }

        const nextSession = prev.sessions[nextIndex];
        return {
          ...prev,
          currentIndex: nextIndex,
          timeLeft: nextSession.duration * 60,
          totalTime: nextSession.duration * 60,
          isRunning: true,
          workCycles: newWorkCycles,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isRunning, onComplete]);

  const handleStart = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const handlePause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const handleStop = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const handleReset = useCallback(() => {
    const sessions = buildSessions(taskDuration);
    setState({
      sessions,
      currentIndex: 0,
      timeLeft: sessions[0].duration * 60,
      totalTime: sessions[0].duration * 60,
      isRunning: false,
      workCycles: 0,
    });
  }, [taskDuration]);

  const handleAddSession = useCallback(() => {
    const newSession: Session = { type: "work", duration: WORK_DURATION };
    setState((prev) => {
      const newSessions = [...prev.sessions, newSession];
      const newIndex = newSessions.length - 1;
      return {
        ...prev,
        sessions: newSessions,
        currentIndex: newIndex,
        timeLeft: WORK_DURATION * 60,
        totalTime: WORK_DURATION * 60,
        isRunning: true,
      };
    });
  }, []);

  const currentSession = state.sessions[state.currentIndex];

  return {
    timeLeft: state.timeLeft,
    totalTime: state.totalTime,
    isRunning: state.isRunning,
    sessionType: currentSession?.type ?? "work",
    workCycles: state.workCycles,
    totalSessions: state.sessions.filter((s) => s.type === "work").length,
    handleStart,
    handlePause,
    handleStop,
    handleReset,
    handleAddSession,
  };
}
