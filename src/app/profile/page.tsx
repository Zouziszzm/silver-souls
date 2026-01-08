"use client";

import React from "react";
import Masonry from "react-masonry-css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMyCollections, useMySlivers, useMounted } from "@/lib/hooks";
import { SliverCard } from "@/components/SliverCard";
import { MOCK_SLIVERS } from "@/data/mockSlivers";
import { SilverSoulLoader } from "@/components/SilverSoulLoader";
import { BookMarked, PenLine, Award } from "lucide-react";

import { AdminDashboard } from "@/components/AdminDashboard";
import { fetchSystemStats, SystemStats } from "@/lib/api";

export default function ProfilePage() {
  const mounted = useMounted();
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [activeTab, setActiveTab] = React.useState<
    "slivers" | "collections" | "dashboard"
  >("slivers");
  // Hack for demo: Check if we came from creator login
  const [isCreator, setIsCreator] = React.useState(false);
  const [stats, setStats] = React.useState<SystemStats | null>(null);

  React.useEffect(() => {
    // Check if creator flag is set (we will set this in login page)
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("ss_is_creator") === "true"
    ) {
      setIsCreator(true);
      fetchSystemStats().then(setStats);
    }
  }, []);

  const { data: collections, isLoading: isCollectionsLoading } =
    useMyCollections();
  const { data: userSlivers, isLoading: isSliversLoading } = useMySlivers();

  if (!mounted) return null;

  const slivers = userSlivers || [];
  const totalPrestige = slivers.reduce((acc, curr) => acc + curr.prestige, 0);

  const breakpointColumns = {
    default: 2,
    700: 1,
  };

  // Placeholder check handled above.

  // To meet the requirement EXACTLY: "my name is static... title: creator of this void"
  // I will make the profile dynamic.

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 pt-24 space-y-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-muted-silver/20 pb-16">
        <div className="space-y-6">
          <div className="h-24 w-24 rounded-3xl bg-ash-white border border-muted-silver/30 flex items-center justify-center text-3xl font-serif text-slate-blue-gray shadow-sm">
            {/* Dynamic Initials */}
            {isCreator ? "S" : "EV"}
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-serif text-slate-blue-gray">
              {isCreator ? "Static" : "Elena Vance"}
            </h1>
            <p className="text-ink-gray max-w-lg leading-relaxed italic">
              {isCreator
                ? "The creator of this void"
                : "Archivist of the ephemeral. Collector of echoes. Living between the lines of things unsaid."}
            </p>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Stats ... */}
          {/* ... existing stats ... */}
          <div className="text-center group">
            <div className="flex items-center gap-2 text-ink-gray/40 mb-1">
              <PenLine className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold">
                Slivers
              </span>
            </div>
            <p className="text-2xl font-serif text-slate-blue-gray">
              {slivers.length}
            </p>
          </div>
          <div className="text-center group">
            <div className="flex items-center gap-2 text-ink-gray/40 mb-1">
              <BookMarked className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold">
                Saved
              </span>
            </div>
            <p className="text-2xl font-serif text-slate-blue-gray">0</p>
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
          <button
            onClick={() => setActiveTab("slivers")}
            className={cn(
              "text-sm font-sans font-semibold uppercase tracking-widest transition-colors pb-4 -mb-[18px]",
              activeTab === "slivers"
                ? "text-slate-blue-gray border-b-2 border-slate-blue-gray"
                : "text-ink-gray/40 hover:text-slate-blue-gray"
            )}
          >
            My Slivers
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            className={cn(
              "text-sm font-sans font-semibold uppercase tracking-widest transition-colors pb-4 -mb-[18px]",
              activeTab === "collections"
                ? "text-slate-blue-gray border-b-2 border-slate-blue-gray"
                : "text-ink-gray/40 hover:text-slate-blue-gray"
            )}
          >
            Collections
          </button>
          {/* Creator Dashboard Tab */}
          <button
            onClick={() => setActiveTab("dashboard")}
            className={cn(
              "text-sm font-sans font-semibold uppercase tracking-widest transition-colors pb-4 -mb-[18px]",
              activeTab === "dashboard"
                ? "text-slate-blue-gray border-b-2 border-slate-blue-gray"
                : "text-ink-gray/40 hover:text-slate-blue-gray"
            )}
          >
            Dashboard
          </button>
        </nav>

        {activeTab === "slivers" ? (
          <div>
            {isSliversLoading && (
              <div className="flex justify-center py-8">
                <SilverSoulLoader />
              </div>
            )}
            {!isSliversLoading && slivers.length === 0 && (
              <div className="py-12 text-center border border-dashed border-muted-silver rounded-2xl">
                <p className="text-ink-gray italic mb-4">
                  You have not released any slivers yet.
                </p>
              </div>
            )}
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {slivers.map((sliver) => (
                <div key={sliver.id} className="mb-6">
                  <SliverCard sliver={sliver} />
                </div>
              ))}
            </Masonry>
          </div>
        ) : activeTab === "collections" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isCollectionsLoading && (
              <div className="col-span-full flex justify-center py-8">
                <SilverSoulLoader />
              </div>
            )}
            {!isCollectionsLoading &&
              (!collections || collections.length === 0) && (
                <div className="col-span-full py-12 text-center border border-dashed border-muted-silver rounded-2xl">
                  <p className="text-ink-gray italic mb-4">
                    You haven&apos;t woven any collections yet.
                  </p>
                  <button className="text-sm font-sans uppercase tracking-widest text-slate-blue-gray hover:text-antique-gold transition-colors">
                    Create Collection
                  </button>
                </div>
              )}
            {collections?.map((col) => (
              <Link
                href={`/collections/${col.id}`}
                key={col.id}
                className="group bg-ash-white p-8 rounded-2xl border border-muted-silver/50 hover:border-slate-blue-gray/30 transition-all hover:shadow-md cursor-pointer relative overflow-hidden block"
              >
                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <BookMarked className="h-5 w-5 text-slate-blue-gray/40" />
                </div>
                <h3 className="text-xl font-serif text-slate-blue-gray mb-2">
                  {col.title}
                </h3>
                <p className="text-sm text-ink-gray/60 mb-6 min-h-[40px] line-clamp-2">
                  {col.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between text-xs text-ink-gray/40 font-sans tracking-wide">
                  <span>{col.count} Items</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* DASHBOARD VIEW FOR CREATOR */

          <div>
            {stats ? (
              <AdminDashboard stats={stats} />
            ) : (
              <div className="flex justify-center py-12">
                <SilverSoulLoader />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
