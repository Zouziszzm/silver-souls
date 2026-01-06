"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, X, Hash, User, Library, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-snow-blue/98 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-6 pt-24 space-y-12">
        <div className="flex items-center justify-between border-b-2 border-slate-blue-gray/10 pb-4">
          <div className="flex items-center gap-4 flex-grow">
            <Search className="h-8 w-8 text-slate-blue-gray/40" />
            <input
              autoFocus
              type="text"
              placeholder="Searching for resonance..."
              className="bg-transparent text-3xl font-serif text-slate-blue-gray placeholder:text-slate-blue-gray/20 border-none outline-none w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-blue-gray/5 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-slate-blue-gray/60" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest text-ink-gray/50 font-sans font-semibold">
              Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Slivers", icon: FileText },
                { label: "Authors", icon: User },
                { label: "Genres", icon: Hash },
                { label: "Collections", icon: Library },
              ].map((cat) => (
                <button
                  key={cat.label}
                  className="flex items-center gap-2 px-4 py-2 bg-ash-white border border-muted-silver/30 rounded-full hover:border-slate-blue-gray/30 hover:shadow-sm transition-all"
                >
                  <cat.icon className="h-4 w-4 text-ink-gray" />
                  <span className="text-sm text-slate-blue-gray font-medium">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-widest text-ink-gray/50 font-sans font-semibold">
              Recent Explorations
            </h3>
            <div className="space-y-4">
              {["Classical Poetry", "Stoicism", "Julian Thorne", "Silence"].map(
                (item) => (
                  <button
                    key={item}
                    className="flex items-center gap-3 w-full text-left p-2 hover:bg-slate-blue-gray/5 rounded-lg transition-colors group"
                  >
                    <Search className="h-4 w-4 text-ink-gray/40 group-hover:text-slate-blue-gray" />
                    <span className="text-lg font-serif text-slate-blue-gray/80 group-hover:text-slate-blue-gray">
                      {item}
                    </span>
                  </button>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
