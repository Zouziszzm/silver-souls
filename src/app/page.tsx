"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Masonry from "react-masonry-css";
import { SliverCard } from "@/components/SliverCard";
import { MOCK_SLIVERS } from "@/data/mockSlivers";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulated auth check
    const hasOnboarded = localStorage.getItem("ss_onboarded") === "true";
    if (
      !hasOnboarded &&
      typeof window !== "undefined" &&
      window.location.pathname === "/"
    ) {
      // router.push("/login"); // Disable redirect for easier development visibility
    }
  }, [router]);

  if (!mounted) return null;

  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {MOCK_SLIVERS.map((sliver) => (
          <div key={sliver.id} className="mb-6">
            <SliverCard sliver={sliver} />
          </div>
        ))}
      </Masonry>
    </div>
  );
}
