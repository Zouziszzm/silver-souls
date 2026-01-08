"use client";

import { devLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleEnterVoid = async () => {
    if (password !== "thelastbattle") {
      setError("The void remains silent. Incorrect password.");
      return;
    }

    setLoading(true);
    setError("");
    const token = await devLogin();
    if (token) {
      localStorage.setItem("ss_token", token);
      localStorage.setItem("ss_is_creator", "true");
      // Wait a moment for local storage to set
      setTimeout(() => {
        router.push("/profile");
      }, 500);
    } else {
      setError("The void rejected your entry.");
      setLoading(false);
    }
  };

  return (
    <div className="flex  min-h-[calc(100vh-64px)] w-full items-center justify-center bg-snow-blue px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-serif text-slate-blue-gray">
            Creator Access
          </h1>
          <p className="mt-2 text-sm text-ink-gray/60 italic">
            "Only through silence shall you enter."
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="password"
            placeholder="Whisper the password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-muted-silver/50 rounded-md text-slate-blue-gray placeholder-ink-gray/30 focus:outline-none focus:border-slate-blue-gray transition-colors"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleEnterVoid}
            disabled={loading}
            className="w-full rounded-md bg-slate-blue-gray px-4 py-3 text-white transition-colors hover:bg-slate-blue-gray/90 disabled:opacity-50 font-serif"
          >
            {loading ? "Entering..." : "Enter the Void"}
          </button>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full text-sm text-ink-gray/60 hover:text-slate-blue-gray transition-colors underline-offset-4 hover:underline"
        >
          Just looking around? Explore the archive.
        </button>

        <p className="text-xs text-ink-gray/40">
          Identity: Static // The Creator
        </p>
      </div>
    </div>
  );
}
