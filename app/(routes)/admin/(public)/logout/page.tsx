"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    const delayedSignOut = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await signOut({ callbackUrl: "/admin/login" });
      } catch (error) {
        console.error("logout failed:", error);
      }
    };

    delayedSignOut();
  }, []);

  return (
    <div className="min-h-svh">Your session has expired. You will be redirected soon.</div>
  );
}
