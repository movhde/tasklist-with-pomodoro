"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export default function ProfileSection({ email }: { email?: string }) {
  // username is shown in the form area (not near avatar), keep this component avatar-only
  useMemo(() => email, [email]);

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
    <div
      className="
    flex
    w-full
    justify-center

    lg:block
    lg:w-auto
  "
    >
      <div className="relative h-[170px] w-[170px] lg:h-[110px] lg:w-[110px]">
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#DDF0FF] bg-[#F5FBFF] dark:bg-[#2B2C42]">
          <Image
            src={avatar || "/icons/avatar.svg"}
            alt="avatar"
            fill
            className={avatar ? "object-cover" : "object-cover p-8"}
          />
        </div>
      </div>
    </div>
  );
}
