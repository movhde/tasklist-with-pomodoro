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

export default function DashboardSettingsPage() {
  const { user } = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const [signOutOpen, setSignOutOpen] = useState(false);

  return (
    <MainLayout
      email={user?.email}
      backgroundClassName="bg-[#F5FBFF] dark:bg-[#78719dc7]"
    >
      <div className="w-full max-w-[1120px] lg:h-[calc(100vh-64px)] flex flex-col gap-8">
        {/* User Information Card */}
        <section className="w-full shrink-0 rounded-[40px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:bg-[#32334B] sm:p-10">
          <SettingsHeader />

          <div className="mt-6">
            <h1 className="text-[34px] font-bold text-[#2A2A34] dark:text-white sm:text-[42px]">
              User
            </h1>
            <p className="mt-1 text-[14px] text-[#9B9B9B]">
              manage your account and preferences
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
            <ProfileSection email={user?.email} />

            <div className="flex w-full max-w-[680px] flex-col">
              <UserInfoForm email={user?.email} />

              <div className="mt-6 space-y-4">
                <ChangePasswordButton
                  onClick={() => router.push("/dashboard/settings/change-password")}
                >
                  Change password
                </ChangePasswordButton>

                <ChangePasswordButton
                  variant="pink"
                  onClick={() => setSignOutOpen(true)}
                >
                  Sign out
                </ChangePasswordButton>
              </div>
            </div>
          </div>
        </section>

        {/* Completion Analytics Card */}
        <section className="w-full flex-1 min-h-0 rounded-[40px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:bg-[#32334B] sm:p-8">
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
