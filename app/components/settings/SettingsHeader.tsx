"use client";

import DarkModeButton from "@/app/components/Elements/DarkModeButton";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsHeader() {
  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={logout}
        className="text-[12px] font-semibold text-[#303153] hover:underline dark:text-white"
      >
        Log out
      </button>
      <DarkModeButton />
    </div>
  );
}

