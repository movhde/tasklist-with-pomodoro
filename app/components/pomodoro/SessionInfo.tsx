import { SessionType } from "@/types/pomodoro";

interface SessionInfoProps {
  sessionType: SessionType;
  cycles: number;
  totalSessions: number;
  categoryName?: string;
}

export function SessionInfo({
  sessionType,
  cycles,
  totalSessions,
  categoryName,
}: SessionInfoProps) {
  return (
    <div className="text-center items-center flex md:flex-row flex-col md:gap-4 order-1 md:-order-1">
      <div className="flex flex-row gap-2 items-center">
        <h2 className="font-sniglet text-2xl font-bold text-gray-700 mb-1">
          {sessionType === "work" ? "Work Session" : "Break Time"}
        </h2>
        <p className="font-sniglet text-sm text-gray-500">
          Cycle: {cycles} of {totalSessions}
        </p>
      </div>
      {categoryName && (
        <span className="hidden md:block font-sniglet text-sm font-medium text-blue-400 bg-blue-50 px-3 py-1 rounded-full">
          {categoryName}
        </span>
      )}
    </div>
  );
}
