import clsx from "clsx";
import Link from "next/link";

const variants = {
  primary: "bg-[#FF8BA6] hover:bg-[#ff6b8f]",
  secondary: "bg-[#5FECDC] hover:bg-[#3ed4c2]",
  lightPrimary: "bg-[#FEBBDE] hover:bg-[#fd9ecd]",
  tertiary: "bg-[#F08A7F] hover:bg-[#e86a5c]",
  gradient:
    "bg-linear-to-r from-[#FF9FB0] to-[#FC77B0] hover:from-[#fc8ca2] hover:to-[#fb5ea0]",
};

export default function Button({
  children,
  className,
  href,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  variant: "primary" | "secondary" | "lightPrimary" | "tertiary" | "gradient";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex-1 outline-none text-center px-4 py-3 lg:px-8 lg:py-4 text-white text-base md:text-xl font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
