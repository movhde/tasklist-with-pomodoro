"use client";

import LightIcon from "./LightIcon";
import DarkIcon from "./DarkIcon";
import { useTheme } from "@/app/providers/ThemeProvider";

export default function DarkModeButton() {
  const theme = useTheme();

  return (
    <div
      className={`flex cursor-pointer items-center justify-center rounded-full border-2 p-1 md:p-3 h-6 w-14 border-[#FFA9CA] bg-[#FEFEFE] dark:bg-[#40415B]`}
      onClick={theme.toggle}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`bg-[#9EE0FF] p-2 h-2 w-2 rounded-full transform transition-transform duration-500 dark:bg-[#fefefe] ${theme.isDark ? "translate-x-0" : "translate-x-6"}`}
        ></span>
        {theme.isDark ? (
          <LightIcon
            className={`transform transition-transform duration-500  ${theme.isDark ? "translate-x-0" : "-translate-x-6"}`}
          />
        ) : (
          <DarkIcon
            className={`transform transition-transform duration-500 ${theme.isDark ? "translate-x-0" : "-translate-x-6"}`}
          />
        )}
      </div>
    </div>
  );
}
