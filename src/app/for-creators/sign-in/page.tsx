import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { SignInForm } from "@/components/creators/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in · Token360 for Creators",
};

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </>
  );
}
