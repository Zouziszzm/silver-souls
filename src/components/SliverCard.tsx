"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Quote,
  Feather,
  BookOpen,
  PenTool,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sliver, SliverType } from "@/lib/types";
import { togglePrestige, toggleSaveSliver } from "@/lib/api";
import { AUTHOR_LINKS } from "@/lib/constants";

const TYPE_ICONS = {
  Quote: Quote,
  Poem: Feather,
  Literature: BookOpen,
  Essay: PenTool,
};

interface SliverCardProps {
  sliver: Sliver;
  className?: string;
}

export const SliverCard = ({ sliver, className }: SliverCardProps) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [prestigeCount, setPrestigeCount] = React.useState(sliver.prestige);

  const handleLike = async () => {
    const token = localStorage.getItem("ss_token");
    if (!token) {
      alert("You must be logged in to give prestige.");
      return;
    }

    // Optimistic update
    const previousLiked = isLiked;
    const previousCount = prestigeCount;

    setIsLiked(!isLiked);
    setPrestigeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      await togglePrestige(sliver.id);
    } catch (error) {
      // Revert on error
      setIsLiked(previousLiked);
      setPrestigeCount(previousCount);
      console.error("Failed to toggle like", error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("ss_token");
    if (!token) {
      alert("You must be logged in to save slivers.");
      return;
    }

    const previousSaved = isSaved;
    setIsSaved(!isSaved);

    try {
      await toggleSaveSliver(sliver.id);
    } catch (error) {
      setIsSaved(previousSaved);
      console.error("Failed to toggle save", error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://silver-soul.com/sliver/${sliver.id}`
      );
      // In a real app, show a toast here
      alert("Link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sliver-card group p-6 rounded-2xl flex flex-col gap-6 relative overflow-hidden",
        className
      )}
    >
      <Link
        href={`/sliver/${sliver.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${sliver.type} by ${sliver.author}`}
      />

      <div className="flex justify-between items-start relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-ink-gray/60 font-sans font-semibold border-b border-transparent group-hover:border-antique-gold/30 transition-colors">
          {sliver.type}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={handleSave}
            className={cn(
              "p-2 rounded-full transition-colors z-20 relative",
              isSaved
                ? "text-antique-gold bg-antique-gold/10"
                : "hover:bg-slate-blue-gray/5 hover:text-slate-blue-gray text-ink-gray/40"
            )}
            title={isSaved ? "Saved" : "Save to Collection"}
          >
            <Bookmark
              className={cn("h-3.5 w-3.5", isSaved && "fill-current")}
            />
          </button>
          <button
            onClick={handleShare}
            className="p-2 hover:bg-slate-blue-gray/5 hover:text-slate-blue-gray text-ink-gray/40 rounded-full transition-colors z-20 relative"
            title="Share"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-grow relative z-10 pointer-events-none">
        {sliver.title && (
          <h3 className="mb-4 text-xl font-bold font-serif text-slate-800 opacity-90 group-hover:opacity-100 transition-opacity">
            {sliver.title}
          </h3>
        )}
        <p
          className={cn(
            "sliver-text text-slate-blue-gray leading-7 transition-colors duration-300 group-hover:text-slate-800",
            sliver.type === "Quote"
              ? "text-xl italic font-serif"
              : "text-lg font-serif whitespace-pre-wrap"
          )}
        >
          {sliver.content}
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-muted-silver/20 pt-4 mt-2 relative z-10">
        <div className="space-y-1">
          {AUTHOR_LINKS[sliver.author] ? (
            <a
              href={AUTHOR_LINKS[sliver.author]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-blue-gray/90 group-hover:text-black transition-colors z-20 relative hover:underline decoration-antique-gold/50 underline-offset-4"
              onClick={(e) => e.stopPropagation()}
            >
              {sliver.author}
            </a>
          ) : (
            <p className="text-sm font-medium text-slate-blue-gray/90 group-hover:text-black transition-colors pointer-events-none">
              {sliver.author}
            </p>
          )}
          <div className="flex gap-2 flex-wrap pointer-events-none">
            {sliver.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wide text-ink-gray/50 group-hover:text-antique-gold transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleLike}
          className={cn(
            "flex items-center gap-1.5 group/prestige px-2 py-1 rounded-full transition-colors z-20 relative",
            isLiked ? "bg-antique-gold/10" : "hover:bg-antique-gold/5"
          )}
          title="Give Prestige"
        >
          <span
            className={cn(
              "font-sans font-medium text-sm tabular-nums transition-colors",
              isLiked ? "text-antique-gold" : "text-antique-gold"
            )}
          >
            {prestigeCount}
          </span>
          <Heart
            className={cn(
              "h-3.5 w-3.5 transition-all",
              isLiked
                ? "text-antique-gold fill-antique-gold"
                : "text-ink-gray/20 group-hover/prestige:text-antique-gold group-hover/prestige:fill-antique-gold"
            )}
          />
        </button>
      </div>

      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};
