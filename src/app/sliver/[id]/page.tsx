"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Heart, Bookmark, Share2, ArrowLeft } from "lucide-react";
import { MOCK_SLIVERS } from "@/data/mockSlivers";
import { cn } from "@/lib/utils";

export default function SliverDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const sliver = MOCK_SLIVERS.find((s) => s.id === id);

  if (!sliver)
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-serif text-slate-blue-gray">
          The word has vanished.
        </h2>
        <p className="text-ink-gray">
          This Sliver no longer exists or has been reclaimed by the silence.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-8 text-antique-gold font-medium"
        >
          Return to the stream
        </button>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-16 flex items-center gap-2 text-ink-gray/60 hover:text-slate-blue-gray transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back to discovery</span>
      </button>

      <article className="space-y-16">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-ink-gray/40 font-sans font-semibold">
            {sliver.type}
          </span>
          <p
            className={cn(
              "sliver-text text-slate-blue-gray leading-[1.8] text-3xl md:text-4xl",
              sliver.type === "Quote" ? "italic" : ""
            )}
          >
            {sliver.content}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-t border-muted-silver/20 pt-12">
          <div className="space-y-2">
            <p className="text-lg font-serif font-medium text-slate-blue-gray">
              {sliver.author}
            </p>
            <div className="flex flex-wrap gap-3">
              {sliver.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-ink-gray/60 bg-ash-white px-3 py-1 rounded-full border border-muted-silver/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex flex-col items-center gap-1 group">
              <div className="p-3 rounded-full bg-ash-white border border-muted-silver/30 group-hover:border-antique-gold/30 group-hover:bg-ash-white transition-all shadow-sm">
                <Heart className="h-5 w-5 text-ink-gray/40 group-hover:text-antique-gold/60 group-hover:fill-antique-gold/10" />
              </div>
              <span className="text-xs font-sans font-medium text-antique-gold">
                {sliver.prestige}
              </span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="p-3 rounded-full bg-ash-white border border-muted-silver/30 group-hover:border-slate-blue-gray/30 group-hover:bg-ash-white transition-all shadow-sm">
                <Bookmark className="h-5 w-5 text-ink-gray/40 group-hover:text-slate-blue-gray/60" />
              </div>
              <span className="text-xs font-sans font-medium text-ink-gray/60">
                Save
              </span>
            </button>

            <button className="flex flex-col items-center gap-1 group">
              <div className="p-3 rounded-full bg-ash-white border border-muted-silver/30 group-hover:border-slate-blue-gray/30 group-hover:bg-ash-white transition-all shadow-sm">
                <Share2 className="h-5 w-5 text-ink-gray/40 group-hover:text-slate-blue-gray/60" />
              </div>
              <span className="text-xs font-sans font-medium text-ink-gray/60">
                Share
              </span>
            </button>
          </div>
        </div>
      </article>

      <section className="mt-32 pt-16 border-t border-muted-silver/20">
        <h4 className="text-[10px] uppercase tracking-widest text-ink-gray/40 font-sans font-semibold mb-8">
          Personal Notes (Private)
        </h4>
        <div className="bg-ash-white/50 border border-dashed border-muted-silver/50 p-8 rounded-2xl text-center">
          <p className="text-ink-gray/40 font-serif italic italic">
            Add a private reflection to this Sliver...
          </p>
        </div>
      </section>
    </div>
  );
}
