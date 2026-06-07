"use client";

import { MainLayout } from "@/app/components/dashboard/MainLayout";
import {
  AnalyticsSection,
  ChangePasswordButton,
  ProfileSection,
  SettingsHeader,
  SignOutConfirmModal,
  UserInfoForm,
} from "@/app/components/settings";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function DashboardSettingsPage() {
  const { user } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const [signOutOpen, setSignOutOpen] = useState(false);

  const username =
    user?.email && user.email.includes("@")
      ? user.email.split("@")[0]
      : user?.email || "";

  return (
    <MainLayout
      email={user?.email}
      backgroundClassName="bg-[#F5FBFF] dark:bg-[#78719dc7]"
      contentClassName="overflow-hidden"
    >
      <div className="w-full max-w-[1120px] h-full flex flex-col gap-0 lg:gap-4 overflow-hidden font-sniglet">
        {/* User Information Card */}
        <section className="w-full bg-transparent p-0 lg:bg-white lg:p-7 lg:rounded-[40px] dark:lg:bg-[#32334B] font-sniglet">
          <SettingsHeader />
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <ProfileSection email={user?.email} />

            <div className="flex w-full max-w-[680px] flex-col">
              <div className="mb-3">
                <h1 className="text-[30px] font-bold text-[#2A2A34] dark:text-white sm:text-[34px] font-sniglet">
                  {username || "User"}
                </h1>
                <p className="mt-1 text-[12px] text-[#9B9B9B] font-sniglet">
                  manage your account and preferences
                </p>
              </div>

              <UserInfoForm email={user?.email} />

              <div className="mt-4 flex gap-2 space-y-3">
                <ChangePasswordButton
                  onClick={() =>
                    router.push("/dashboard/settings/change-password")
                  }
                >
                  Change password
                </ChangePasswordButton>

                <ChangePasswordButton
                  variant="pink"
                  onClick={() => setSignOutOpen(true)}
                >
                  Log out
                </ChangePasswordButton>
              </div>
            </div>
          </div>
        </section>
        {/* Completion Analytics Card */}
        <section className="w-full bg-transparent p-0 lg:flex-1 lg:min-h-[420px] lg:bg-white lg:p-6 lg:rounded-[40px] dark:lg:bg-[#32334B] font-sniglet">
          <AnalyticsSection />
        </section>
      </div>

      <SignOutConfirmModal
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onConfirm={() => {
          setSignOutOpen(false);
          logout();
        }}
      />
    </MainLayout>
  );
}
