import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/libs/next-auth";
import { redirect } from "next/navigation";

export default async function BaseLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/admin/logout");
  }

  if (!session) {
    redirect("/admin/login");
  }

  return <main className="mx-auto max-w-screen-2xl">{children}</main>;
}
