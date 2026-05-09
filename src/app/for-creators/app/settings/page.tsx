import type { Metadata } from "next";
import { ProfileSection } from "@/components/creators/settings/ProfileSection";
import { SecuritySection } from "@/components/creators/settings/SecuritySection";
import { ApiKeySection } from "@/components/creators/settings/ApiKeySection";
import { DeleteAccount } from "@/components/creators/settings/DeleteAccount";

export const metadata: Metadata = {
  title: "Settings · Token360 Creators",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-[900px]">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your profile, password, and API access.
        </p>
      </header>
      <div className="grid gap-5">
        <ProfileSection />
        <SecuritySection />
        <ApiKeySection />
        <DeleteAccount />
      </div>
    </div>
  );
}
