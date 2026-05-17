"use client";

import { useRouter } from "next/navigation";

export default function GuestButton() {
  const router = useRouter();

  const handleGuest = async () => {
    try {
      const res = await fetch("/api/auth/guest", { method: "POST" });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        console.error("Failed to create guest session");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      onClick={handleGuest}
      className="font-sniglet tracking-widest cursor-pointer outline-none text-[#6F6F6F] text-sm md:text-base font-bold hover:text-[#565656] dark:text-white"
    >
      continue as guest
    </button>
  );
}
