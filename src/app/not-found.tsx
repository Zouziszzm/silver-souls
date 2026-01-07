"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-snow-blue px-6 text-center">
      <div className="space-y-6 max-w-md animate-in fade-in zoom-in duration-700">
        <h1 className="text-9xl font-serif text-slate-blue-gray/10">404</h1>
        <h2 className="text-3xl font-serif text-slate-blue-gray">
          A Silence where a Sliver should be.
        </h2>
        <p className="text-ink-gray leading-relaxed">
          The page you are looking for has drifted into the void. Perhaps it was
          never written, or perhaps it has simply returned to the silence.
        </p>
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-blue-gray text-ash-white rounded-full font-medium hover:bg-slate-blue-gray/90 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to the Library
          </Link>
        </div>
      </div>
    </div>
  );
}
