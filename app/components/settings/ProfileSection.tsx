"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ProfileSection({ email }: { email?: string }) {
  const username = useMemo(() => {
    if (!email) return "";
    return email.includes("@") ? email.split("@")[0] : email;
  }, [email]);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile_avatar");
      if (saved) setAvatar(saved);
    } catch {}
  }, []);

  function onPickFile() {
    fileRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      setAvatar(result);
      try {
        localStorage.setItem("profile_avatar", result);
      } catch {}
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="shrink-0">
      <div className="mb-3 text-center lg:text-left">
        <div className="text-[16px] font-semibold text-[#303153] dark:text-white">
          {username || "user"}
        </div>
      </div>

      <div className="relative w-[160px] h-[160px]">
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#DDF0FF] bg-[#F5FBFF] dark:bg-[#2B2C42]">
          <Image
            src={avatar || "/icons/avatar.svg"}
            alt="avatar"
            fill
            className={avatar ? "object-cover" : "object-cover p-8"}
          />
        </div>

        <button
          type="button"
          aria-label="Change avatar"
          className="absolute -bottom-1 -right-1 flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 border-[#66C2FF] bg-white shadow-[0_10px_25px_rgba(102,194,255,.18)] transition hover:scale-[1.02] dark:bg-[#32334B]"
          onClick={onPickFile}
        >
          <ImagePlus size={22} className="text-[#3AAFF8]" />
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
    </div>
  );
}
