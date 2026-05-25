export type DashboardMode = "all" | "today" | "category" | "calendar";

export interface DashboardFilter {
  mode: DashboardMode;

  categoryId?: string;

  date?: string;
}
