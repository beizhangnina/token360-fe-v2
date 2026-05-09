import type { Metadata } from "next";
import { CreatorStudioShell } from "@/components/creators/CreatorStudioShell";

export const metadata: Metadata = {
  title: "Studio · Token360 Creators",
};

export default function StudioPage() {
  return (
    <div className="-mx-5 md:-mx-8">
      <CreatorStudioShell mode="authenticated" showTemplates />
    </div>
  );
}
