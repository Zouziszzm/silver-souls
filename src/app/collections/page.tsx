"use client";

import React from "react";
import Link from "next/link";
import { Library, BookCopy, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_COLLECTIONS = [
  {
    id: "1",
    title: "Midnight Reflections",
    count: 24,
    lastUpdated: "2 days ago",
    isPrivate: true,
  },
  {
    id: "2",
    title: "Stoic Aphorisms",
    count: 12,
    lastUpdated: "1 week ago",
    isPrivate: false,
  },
  {
    id: "3",
    title: "Modern Verses",
    count: 8,
    lastUpdated: "3 weeks ago",
    isPrivate: false,
  },
  {
    id: "4",
    title: "Fragments of Fiction",
    count: 56,
    lastUpdated: "1 month ago",
    isPrivate: true,
  },
  {
    id: "5",
    title: "The Quiet Library",
    count: 102,
    lastUpdated: "2 months ago",
    isPrivate: false,
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 pt-24 space-y-16">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-ink-gray/40">
          <Library className="h-6 w-6" />
          <h1 className="text-sm font-sans font-semibold uppercase tracking-[0.2em]">
            Personal Library
          </h1>
        </div>
        <h2 className="text-4xl font-serif text-slate-blue-gray">
          Collections
        </h2>
        <p className="text-ink-gray max-w-xl">
          Your curated repositories of resonance. Organized by thought, mood, or
          silence.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <button className="h-64 rounded-3xl border-2 border-dashed border-muted-silver/40 flex flex-col items-center justify-center gap-4 text-ink-gray/40 hover:border-slate-blue-gray/30 hover:text-slate-blue-gray hover:bg-ash-white/50 transition-all group">
          <div className="p-4 rounded-full bg-ash-white/50 group-hover:bg-ash-white transition-colors">
            <BookCopy className="h-8 w-8" />
          </div>
          <span className="font-serif text-lg italic">
            Curate New Collection
          </span>
        </button>

        {MOCK_COLLECTIONS.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="h-64 bg-ash-white rounded-3xl border border-muted-silver/30 p-8 flex flex-col justify-between hover:border-slate-blue-gray/30 hover:shadow-lg transition-all group"
          >
            <div className="flex justify-between items-start">
              <div className="h-12 w-12 rounded-xl bg-snow-blue flex items-center justify-center">
                <Library className="h-6 w-6 text-slate-blue-gray/40 group-hover:text-slate-blue-gray transition-colors" />
              </div>
              {collection.isPrivate && (
                <Lock className="h-4 w-4 text-ink-gray/20" />
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-slate-blue-gray group-hover:text-antique-gold transition-colors">
                {collection.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink-gray/60">
                  {collection.count} Slivers
                </span>
                <div className="flex items-center gap-1.5 text-xs text-ink-gray/40">
                  <Clock className="h-3 w-3" />
                  <span>{collection.lastUpdated}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
