"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("ss_token", token);
      // Also mark as onboarded or fetch user profile to check onboarding status
      localStorage.setItem("ss_onboarded", "true");
      router.push("/");
    } else {
      router.push("/login?error=auth_failed");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center text-ink-gray/60 font-serif">
      Authenticating...
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallbackContent />
    </Suspense>
  );
}
