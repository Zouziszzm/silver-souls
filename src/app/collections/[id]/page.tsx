"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCollection, BackendCollection, mapToSliverType } from "@/lib/api";
import { SliverCard } from "@/components/SliverCard";
import { SilverSoulLoader } from "@/components/SilverSoulLoader";
import Masonry from "react-masonry-css";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Inline helper since api.ts doesn't export the mapper
const mapSliver = (item: BackendCollection["slivers"][0]["sliver"]) => ({
  id: item.id,
  type: mapToSliverType(item.type),
  content: item.contentText,
  author: item.author?.name || "Anonymous",
  prestige: item._count?.prestigeReceived || 0,
  tags: item.genres?.map((g) => g.genre?.name).filter(Boolean) || [],
});

export default function CollectionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string };

  const {
    data: collection,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => fetchCollection(id),
  });

  const breakpointColumns = {
    default: 2,
    700: 1,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SilverSoulLoader />
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-ink-gray">The collection could not be found.</p>
        <button
          onClick={() => router.back()}
          className="text-slate-blue-gray hover:underline"
        >
          Return to previous page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-ink-gray/50 hover:text-slate-blue-gray transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-sans uppercase tracking-widest">
          Back
        </span>
      </button>

      <div className="space-y-4 mb-16 border-b border-muted-silver/20 pb-8">
        <h1 className="text-4xl font-serif text-slate-blue-gray">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-lg text-ink-gray/70 max-w-2xl">
            {collection.description}
          </p>
        )}
        <div className="flex gap-4 text-xs text-ink-gray/40 font-sans tracking-widest uppercase">
          <span>{collection._count?.slivers || 0} Slivers</span>
          <span>•</span>
          <span>By {collection.isPublic ? "Public" : "Private"} Archive</span>
        </div>
      </div>

      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {collection.slivers?.map(({ sliver }) => (
          <div key={sliver.id} className="mb-8">
            <SliverCard sliver={mapSliver(sliver)} />
          </div>
        ))}
      </Masonry>

      {(!collection.slivers || collection.slivers.length === 0) && (
        <div className="text-center py-24 italic text-ink-gray/40">
          This collection is empty.
        </div>
      )}
    </div>
  );
}
