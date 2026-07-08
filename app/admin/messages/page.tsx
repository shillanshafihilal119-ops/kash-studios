import type { Metadata } from "next";
import { AdminMessagesPanel } from "@/components/AdminMessagesPanel";

export const metadata: Metadata = {
  title: "Messages | KASH STUDIOS"
};

export default function AdminMessagesPage() {
  return (
    <main className="min-h-screen bg-[#080d12]">
      <AdminMessagesPanel />
    </main>
  );
}
