// components/ui/category-chip.tsx

"use client";

import {
  BriefcaseBusiness,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Home,
  Layers3,
  Sparkles,
  UserRound,
  BookOpenText,
  Grid2x2,
} from "lucide-react";

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const categoryIcons: Record<
  string,
  {
    icon: any;
    color: string;
    bg: string;
  }
> = {
  work: {
    icon: BriefcaseBusiness,
    color: "text-[#5B8CFF]",
    bg: "bg-[#EDF3FF]",
  },

  gym: {
    icon: Dumbbell,
    color: "text-[#FF8A65]",
    bg: "bg-[#FFF1EC]",
  },

  study: {
    icon: BookOpenText,
    color: "text-[#8B7CFF]",
    bg: "bg-[#F1EEFF]",
  },

  personal: {
    icon: UserRound,
    color: "text-[#FF6FAF]",
    bg: "bg-[#FFEAF3]",
  },

  health: {
    icon: HeartPulse,
    color: "text-[#FF6FAF]",
    bg: "bg-[#FFEAF3]",
  },

  home: {
    icon: Home,
    color: "text-[#67C587]",
    bg: "bg-[#ECFFF1]",
  },

  other: {
    icon: Sparkles,
    color: "text-[#F5A524]",
    bg: "bg-[#FFF6E5]",
  },

  all: {
    icon: Grid2x2,
    color: "text-[#5F6FFF]",
    bg: "bg-[#EEF1FF]",
  },

  default: {
    icon: Layers3,
    color: "text-[#7B84B2]",
    bg: "bg-[#F4F6FB]",
  },
};

export default function CategoryChip({ label, active, onClick }: Props) {
  const config = categoryIcons[label.toLowerCase()] || categoryIcons.default;

  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`group flex shrink-0 items-center cursor-pointer gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
        active
          ? "border-[#59B7FF] bg-[#EEF7FF] text-[#2F4F7D] shadow-[0_4px_14px_rgba(89,183,255,.14)] dark:border-[#FD81B0] dark:bg-[#FD81B0]/10 dark:text-white"
          : "border-[#DCE7F5] bg-white text-[#4A5374] hover:border-[#59B7FF]/40 dark:border-[#FFFFFF10] dark:bg-[#363750] dark:text-white"
      }`}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${config.bg}`}
      >
        <Icon size={11} strokeWidth={2.3} className={config.color} />
      </div>

      <span>{label}</span>
    </button>
  );
}
