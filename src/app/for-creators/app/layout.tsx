"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCreatorAuth } from "@/lib/creators/auth";
import { AppSidebar } from "@/components/creators/app/AppSidebar";
import { AppTopbar } from "@/components/creators/app/AppTopbar";

export default function CreatorAppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, hydrated } = useCreatorAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (hydrated && !session) {
      router.replace("/for-creators/sign-in");
    }
  }, [hydrated, session, router]);

  if (!hydrated || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] text-[var(--text-muted)]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="md:pl-64">
        <AppTopbar onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
