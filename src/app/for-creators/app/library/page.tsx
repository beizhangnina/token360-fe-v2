import type { Metadata } from "next";
import { LibraryGrid } from "@/components/creators/library/LibraryGrid";

export const metadata: Metadata = {
  title: "Library · Token360 Creators",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">My Creations</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Everything you&rsquo;ve generated, ready to download, share, or remix.
        </p>
      </header>
      <LibraryGrid />
    </div>
  );
}
