"use client";

import React from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type SliverType = "Quote" | "Poem" | "Literature" | "Essay";

export interface Sliver {
  id: string;
  type: SliverType;
  content: string;
  author: string;
  prestige: number;
  tags: string[];
}

interface SliverCardProps {
  sliver: Sliver;
  className?: string;
}

export const SliverCard = ({ sliver, className }: SliverCardProps) => {
  return (
    <div
      className={cn(
        "sliver-card group p-6 rounded-2xl flex flex-col gap-6 relative",
        className
      )}
    >
      <Link
        href={`/sliver/${sliver.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${sliver.type} by ${sliver.author}`}
      />

      <div className="flex justify-between items-start relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-ink-gray/50 font-sans">
          {sliver.type}
        </span>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-1.5 hover:text-slate-blue-gray text-ink-gray/40 transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
          <button className="p-1.5 hover:text-slate-blue-gray text-ink-gray/40 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <p
          className={cn(
            "sliver-text text-slate-blue-gray leading-relaxed",
            sliver.type === "Quote" ? "text-xl italic" : "text-lg"
          )}
        >
          {sliver.content}
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-muted-silver/30 pt-4 mt-2 relative z-10">
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-slate-blue-gray/80">
            {sliver.author}
          </p>
          <div className="flex gap-2">
            {sliver.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-ink-gray/40">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-1.5 group/prestige">
          <span className="text-antique-gold font-sans font-medium text-sm">
            {sliver.prestige}
          </span>
          <Heart className="h-4 w-4 text-ink-gray/20 group-hover/prestige:text-antique-gold/40 group-hover/prestige:fill-antique-gold/20 transition-all" />
        </button>
      </div>
    </div>
  );
};
