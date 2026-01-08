"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Masonry from "react-masonry-css";
import { SliverCard } from "@/components/SliverCard";
import { Hero } from "@/components/Hero";
import { useSlivers, useMounted } from "@/lib/hooks";
import { MOCK_SLIVERS } from "@/data/mockSlivers";
import { SilverSoulLoader } from "@/components/SilverSoulLoader";

export default function Home() {
  const router = useRouter();
  const mounted = useMounted();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSlivers();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastSliverElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    if (!mounted) return;
    const hasOnboarded = localStorage.getItem("ss_onboarded") === "true";
    if (
      !hasOnboarded &&
      typeof window !== "undefined" &&
      window.location.pathname === "/"
    ) {
      router.push("/login");
    }
  }, [mounted, router]);

  if (!mounted) return null;

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  // Flatten the pages from infinite query
  const slivers = data?.pages.flatMap((page) => page) || [];

  // Logic updated: Only show real data. If loading, displaySlivers will be empty initially but handled by isLoading check below.
  const displaySlivers = slivers;

  // If we have real (or empty) data but loading, show loader. If using mocks (fallback), logic differs.
  // Actually, if isLoading is true and no data, show loader.

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        {isLoading && slivers.length === 0 && (
          <div className="flex justify-center py-12">
            <SilverSoulLoader />
          </div>
        )}

        {!isLoading && slivers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <p className="text-xl font-serif text-slate-blue-gray italic">
              &ldquo;Silence is a text easy to misread.&rdquo;
            </p>
            <p className="text-sm text-ink-gray/60 max-w-md">
              The archive is currently empty. Be the first to weave a sliver
              into existence.
            </p>
          </div>
        )}

        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {displaySlivers.map((sliver, index) => {
            if (displaySlivers.length === index + 1) {
              return (
                <div
                  ref={lastSliverElementRef}
                  key={sliver.id}
                  className="mb-8"
                >
                  <SliverCard sliver={sliver} />
                </div>
              );
            }
            return (
              <div key={sliver.id} className="mb-8">
                <SliverCard sliver={sliver} />
              </div>
            );
          })}
        </Masonry>

        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <SilverSoulLoader />
          </div>
        )}
      </div>
    </div>
  );
}
