"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "blue" | "pink";

export default function ChangePasswordButton({
  variant = "blue",
  className,
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
        "h-[52px] w-full rounded-[18px] border-2 bg-transparent text-[13px] font-semibold uppercase tracking-wide transition",
        styles,
        className ?? "",
      ].join(" ")}
      {...props}
    />
  );
}

