"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Plus, User, Library, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "./SearchOverlay";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-snow-blue/80 backdrop-blur-md border-b border-transparent",
        isScrolled && "border-muted-silver bg-snow-blue/95 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-serif font-semibold tracking-tight text-slate-blue-gray"
          >
            Silver-Soul
          </Link>

          <div className="relative group hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-ink-gray" />
            </div>
            <input
              type="text"
              placeholder="Search Slivers..."
              className="bg-ash-white border border-muted-silver/50 rounded-full py-2 pl-10 pr-4 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-muted-silver transition-all cursor-pointer"
              readOnly
              onClick={() => setIsSearchOpen(true)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-gray/50 border border-muted-silver/30 rounded px-1.5 py-0.5 pointer-events-none">
              /
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 bg-slate-blue-gray text-ash-white rounded-full text-sm font-medium hover:bg-slate-blue-gray/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Sliver</span>
          </Link>

          <div className="flex items-center gap-4 text-ink-gray">
            <Link
              href="/collections"
              className="p-2 hover:text-slate-blue-gray transition-colors"
              title="Collections"
            >
              <Library className="h-5 w-5" />
            </Link>
            <Link
              href="/profile"
              className="p-2 hover:text-slate-blue-gray transition-colors"
              title="Profile"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/settings"
              className="p-2 hover:text-slate-blue-gray transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
