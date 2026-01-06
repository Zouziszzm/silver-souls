"use client";

import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // Simulated login logic
    window.location.href = "/onboarding";
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

          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 flex items-center justify-center gap-3 bg-slate-blue-gray text-ash-white rounded-full font-medium hover:bg-slate-blue-gray/90 transition-all active:scale-[0.98]"
          >
            <LogIn className="h-5 w-5" />
            Continue with Google
          </button>
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
