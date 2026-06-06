export interface MenuItem {
  label: string;
  icon?: string;
}

export interface Filter {
  mode: "all" | "today" | "category" | "calendar";
  categoryId?: string;
  date?: string;
}

const DASHBOARD_MENU: MenuItem[] = [
  { label: "Add task", icon: "/icons/add-task.svg" },
  { label: "Today", icon: "/icons/today.svg" },
  { label: "Pomodoro timer", icon: "/icons/pomodoro.svg" },
  { label: "Settings", icon: "/icons/setting.svg" },
];

const OTHER_PAGES_MENU: MenuItem[] = [
  { label: "Dashboard", icon: "/icons/category.svg" },
  { label: "Pomodoro timer", icon: "/icons/pomodoro.svg" },
  { label: "Settings", icon: "/icons/setting.svg" },
];

export function getMenuForPath(pathname: string): MenuItem[] {
  return pathname === "/dashboard" ? DASHBOARD_MENU : OTHER_PAGES_MENU;
}

export const ICON_DARK_CLASS =
  "dark:[filter:brightness(0)_saturate(100%)_invert(73%)_sepia(29%)_saturate(2290%)_hue-rotate(295deg)_brightness(101%)_contrast(102%)]";
