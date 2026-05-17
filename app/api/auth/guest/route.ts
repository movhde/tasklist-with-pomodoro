import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const guestId = crypto.randomUUID();
  const cookieStore = await cookies();

  cookieStore.set("guest_token", guestId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ message: "Guest session started" });
}
