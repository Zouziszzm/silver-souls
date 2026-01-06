"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const GENRES = [
  "Poetry",
  "Classical Literature",
  "Philosophy",
  "Essays",
  "Short Stories",
  "Journaling",
  "Critical Theory",
  "Historical Texts",
  "Memoirs",
  "Theology",
  "Drama",
  "Aphorisms",
];

export default function OnboardingPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const router = useRouter();

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const isComplete = selectedGenres.length >= 3;

  const handleFinish = () => {
    if (isComplete) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-16 px-6 max-w-4xl mx-auto">
      <div className="space-y-12 text-center">
        <header className="space-y-4">
          <h1 className="text-4xl font-serif font-semibold text-slate-blue-gray">
            Curation of Interest
          </h1>
          <p className="text-ink-gray max-w-xl mx-auto">
            Choose at least three genres that resonate with you. This defines
            the silence and tone of your library.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GENRES.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={cn(
                  "p-6 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group",
                  isSelected
                    ? "bg-ash-white border-antique-gold shadow-sm"
                    : "bg-ash-white/50 border-muted-silver/40 hover:border-muted-silver hover:bg-ash-white"
                )}
              >
                <span
                  className={cn(
                    "block text-lg font-serif transition-colors",
                    isSelected ? "text-antique-gold" : "text-slate-blue-gray"
                  )}
                >
                  {genre}
                </span>

                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-antique-gold" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-8">
          <button
            onClick={handleFinish}
            disabled={!isComplete}
            className={cn(
              "px-10 py-3 rounded-full font-medium transition-all duration-300",
              isComplete
                ? "bg-slate-blue-gray text-ash-white hover:bg-slate-blue-gray/90"
                : "bg-muted-silver/30 text-ink-gray/40 cursor-not-allowed"
            )}
          >
            Enter the Library{" "}
            {selectedGenres.length > 0 && `(${selectedGenres.length}/3)`}
          </button>
        </div>
      </div>
    </div>
  );
}
