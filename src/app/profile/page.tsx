"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { SliverCard } from "@/components/SliverCard";
import { MOCK_SLIVERS } from "@/data/mockSlivers";
import { BookMarked, PenLine, Award } from "lucide-react";

export default function ProfilePage() {
  const userSlivers = MOCK_SLIVERS.slice(0, 4);
  const totalPrestige = userSlivers.reduce(
    (acc, curr) => acc + curr.prestige,
    0
  );

  const breakpointColumns = {
    default: 2,
    700: 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 pt-24 space-y-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-muted-silver/20 pb-16">
        <div className="space-y-6">
          <div className="h-24 w-24 rounded-3xl bg-ash-white border border-muted-silver/30 flex items-center justify-center text-3xl font-serif text-slate-blue-gray shadow-sm">
            EV
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-serif text-slate-blue-gray">
              Elena Vance
            </h1>
            <p className="text-ink-gray max-w-lg leading-relaxed italic">
              “Archivist of the ephemeral. Collector of echoes. Living between
              the lines of things unsaid.”
            </p>
          </div>
        </div>

        <div className="flex gap-12">
          <div className="text-center group">
            <div className="flex items-center gap-2 text-ink-gray/40 mb-1">
              <PenLine className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold">
                Slivers
              </span>
            </div>
            <p className="text-2xl font-serif text-slate-blue-gray">42</p>
          </div>
          <div className="text-center group">
            <div className="flex items-center gap-2 text-ink-gray/40 mb-1">
              <BookMarked className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold">
                Saved
              </span>
            </div>
            <p className="text-2xl font-serif text-slate-blue-gray">156</p>
          </div>
          <div className="text-center group">
            <div className="flex items-center gap-2 text-antique-gold/60 mb-1">
              <Award className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold">
                Prestige
              </span>
            </div>
            <p className="text-2xl font-serif text-antique-gold">
              {totalPrestige}
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-12">
        <nav className="flex gap-12 border-b border-muted-silver/10 pb-4">
          <button className="text-sm font-sans font-semibold uppercase tracking-widest text-slate-blue-gray border-b-2 border-slate-blue-gray pb-4 -mb-[18px]">
            My Slivers
          </button>
          <button className="text-sm font-sans font-semibold uppercase tracking-widest text-ink-gray/40 hover:text-slate-blue-gray transition-colors pb-4 -mb-[18px]">
            Collections
          </button>
        </nav>

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {userSlivers.map((sliver) => (
            <div key={sliver.id} className="mb-6">
              <SliverCard sliver={sliver} />
            </div>
          ))}
        </Masonry>
      </section>
    </div>
  );
}
