"use client";

import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // Redirect to Backend Google Auth Endpoint
    window.location.href = "http://localhost:4000/auth/google";
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-12">
        <header className="space-y-4">
          <h1 className="text-5xl font-serif font-semibold text-slate-blue-gray tracking-tight">
            Silver-Soul
          </h1>
          <p className="text-xl text-ink-gray font-light italic">
            “Where words gather weight.”
          </p>
        </header>

        <div className="bg-ash-white p-8 rounded-2xl border border-muted-silver shadow-sm space-y-8">
          <p className="text-slate-blue-gray/80 text-sm">
            Step into the quiet library. Gather your thoughts, share your soul.
          </p>

          <div className="space-y-4">
            {/* <button
              onClick={handleGoogleLogin}
              className="w-full h-12 flex items-center justify-center gap-3 bg-slate-blue-gray text-ash-white rounded-full font-medium hover:bg-slate-blue-gray/90 transition-all active:scale-[0.98]"
            >
              <LogIn className="h-5 w-5" />
              Continue with Google
            </button> */}
            <div className="text-center text-sm text-ink-gray/40 italic pb-2">
              Google Login temporarily disabled for guest access.
            </div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.setItem("ss_token", "guest_mode");
                  localStorage.setItem("ss_onboarded", "true");
                  window.location.href = "/";
                }
              }}
              className="w-full h-12 flex items-center justify-center gap-3 bg-slate-blue-gray text-ash-white rounded-full font-medium hover:bg-slate-blue-gray/90 transition-all active:scale-[0.98]"
            >
              Continue as Guest
            </button>
          </div>
        </div>

        <footer className="pt-8">
          <p className="text-ink-gray/60 text-xs">
            By continuing, you enter a space of intentionality and respect.
          </p>
        </footer>
      </div>
    </div>
  );
}
