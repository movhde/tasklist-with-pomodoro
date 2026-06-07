"use client";

import { useEffect, useMemo, useState } from "react";

export default function UserInfoForm({ email }: { email?: string }) {
  const derivedUsername = useMemo(() => {
    if (!email) return "";
    return email.includes("@") ? email.split("@")[0] : email;
  }, [email]);

  const [username, setUsername] = useState(derivedUsername);
  const [emailValue, setEmailValue] = useState(email ?? "");

  useEffect(() => {
    setUsername(derivedUsername);
    setEmailValue(email ?? "");
  }, [derivedUsername, email]);

  const inputBase =
    "h-[52px] w-full rounded-[16px] border border-[#EAEAEA] bg-white px-4 text-[14px] text-[#2A2A34] outline-none transition focus:border-[#66C2FF] focus:shadow-[0_0_0_4px_rgba(102,194,255,.16)] dark:border-[#FFFFFF18] dark:bg-[#2E2F46] dark:text-white";

  const labelBase =
    "w-[88px] shrink-0 text-[12px] font-semibold text-[#2A2A34] dark:text-white";

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <label className={labelBase} htmlFor="settings-username">
          Username
        </label>
        <input
          id="settings-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputBase}
          placeholder="Username"
        />
      </div>

      <div className="flex items-center gap-4">
        <label className={labelBase} htmlFor="settings-email">
          Email
        </label>
        <input
          id="settings-email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className={inputBase}
          placeholder="Email"
        />
      </div>
    </div>
  );
}

