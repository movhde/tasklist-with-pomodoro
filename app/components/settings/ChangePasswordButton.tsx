"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "blue" | "pink";

export default function ChangePasswordButton({
  variant = "blue",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles =
    variant === "pink"
      ? "border-[#FF7EB6] text-[#FF7EB6] hover:bg-[#FFF3F8] dark:hover:bg-[#3D2C38]"
      : "border-[#66C2FF] text-[#66C2FF] hover:bg-[#F0FAFF] dark:hover:bg-[#253545]";

  return (
    <button
      type="button"
      className={[
        "h-[64px] lg:h-[52px] cursor-pointer w-full rounded-[22px] lg:rounded-[18px] border-2 bg-transparent text-[15px] lg:text-[13px] font-semibold transition font-sniglet",
        styles,
        className ?? "",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
