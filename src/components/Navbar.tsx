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
      setIsScrolled(window.scrollY > 20);
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
        "fixed top-0 z-50 w-full transition-all duration-500 border-b border-transparent",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-white/20 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-serif font-bold tracking-tight text-slate-blue-gray hover:opacity-80 transition-opacity"
          >
            Silver-Soul
          </Link>

          <div
            className="relative group hidden md:block transition-all duration-300"
            onClick={() => setIsSearchOpen(true)}
          >
            <div
              className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent 
              bg-slate-50 hover:bg-white hover:border-muted-silver/50 hover:shadow-sm 
              transition-all duration-300 cursor-pointer group w-64
              ${isScrolled ? "bg-slate-100/50" : "bg-white/40"}
            `}
            >
              <Search className="h-3.5 w-3.5 text-ink-gray/60" />
              <span className="text-sm text-ink-gray/50 font-light">
                Search Slivers...
              </span>
              <kbd className="ml-auto text-[10px] text-ink-gray/30 border border-muted-silver/20 rounded px-1.5 font-sans">
                /
              </kbd>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <SearchOverlay
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
          <Link
            href="/create"
            className="flex items-center gap-2 px-5 py-2 bg-slate-blue-gray text-white rounded-full text-sm font-medium hover:bg-slate-blue-gray/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </Link>

          <div className="flex items-center gap-3 text-ink-gray border-l border-muted-silver/30 pl-5">
            <NavLink href="/collections" icon={Library} label="Collections" />
            <NavLink href="/profile" icon={User} label="Profile" />
            <NavLink href="/settings" icon={Settings} label="Settings" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) => (
  <Link
    href={href}
    className="p-2 text-ink-gray/70 hover:text-slate-blue-gray hover:bg-slate-100/50 rounded-lg transition-all duration-200"
    title={label}
  >
    <Icon className="h-5 w-5" />
  </Link>
);
