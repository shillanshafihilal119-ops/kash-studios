import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminMessagesPanel } from "@/components/AdminMessagesPanel";

export const metadata: Metadata = {
  title: "Messages | KASH STUDIOS"
};

export default function AdminMessagesPage() {
  const isAdminUnlocked = cookies().get("kash_admin_unlocked")?.value === "true";

  if (!isAdminUnlocked) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#080d12]">
      <AdminMessagesPanel />
    </main>
  );
}
