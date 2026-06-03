"use client";

export function getGuestToken(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith("guest_mode="));

  return match ? match.split("=")[1] || null : null;
}

export function isGuestMode(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const hasToken = Boolean(localStorage.getItem("token"));
  if (hasToken) {
    return false;
  }

  return Boolean(getGuestToken());
}

export function clearGuestMode(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = "guest_mode=; path=/; max-age=0";
}
