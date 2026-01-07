"use client";

import React from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "For You",
  "Dark Academia",
  "Romanticism",
  "Philosophy",
  "Modern Poetry",
  "Classics",
  "Minimalism",
  "Nature",
  "Architecture",
];

export const CategoryPills = () => {
  const [active, setActive] = React.useState("For You");

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-6 md:px-0">
      <div className="flex gap-3 min-w-max mx-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "px-5 py-3 rounded-full text-base font-semibold transition-all duration-200 whitespace-nowrap",
              active === cat
                ? "bg-stone-900 text-white shadow-sm hover:bg-black"
                : "bg-transparent text-stone-900 font-semibold hover:bg-stone-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
