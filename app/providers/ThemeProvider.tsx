"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isFirstRun = useRef(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkSaved = savedTheme === "dark";
    const systemDefaultTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const finalTheme = isDarkSaved || (!savedTheme && systemDefaultTheme);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(finalTheme);
    document.documentElement.classList.toggle("dark", finalTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark, mounted]);

  const toggle = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
