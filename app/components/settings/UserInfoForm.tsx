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
    "h-[60px] lg:h-[44px] text-[#36363e]  w-full rounded-[20px] lg:rounded-[14px] border border-[#66C2FF] bg-white px-5 text-[15px] outline-none dark:border-[#4EB3FF] dark:bg-[#3A3C57] dark:text-white font-sniglet";

  return (
    <div className="w-full space-y-4 font-sniglet">
      <div className="space-y-2">
        <label
          htmlFor="settings-username"
          className="block text-[14px] font-semibold text-[#000] dark:text-white font-sniglet"
        >
          Username
        </label>

        <input
          id="settings-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputBase}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="settings-email"
          className="block text-[14px] font-semibold text-[#000] dark:text-white font-sniglet"
        >
          Email
        </label>

        <input
          id="settings-email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          className={inputBase}
        />
      </div>
    </div>
  );
}
