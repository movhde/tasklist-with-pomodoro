"use client";

import { useUser } from "@/hooks/useUser";
import { PomodoroTimer } from "@/app/components/pomodoro/PomodoroTimer";
import { MainLayout } from "@/app/components/dashboard/MainLayout";

export default function PomodoroPage() {
  const { user } = useUser();

  return (
    <MainLayout email={user?.email}>
      <div className="w-full flex justify-center py-8">
        <PomodoroTimer />
      </div>
    </MainLayout>
  );
}
