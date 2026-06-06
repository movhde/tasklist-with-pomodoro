export type SessionType = "work" | "break";

export interface TimerState {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  sessionType: SessionType;
  cycles: number;
}
