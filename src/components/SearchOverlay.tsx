import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  X,
  Hash,
  User,
  Library,
  FileText,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { searchSlivers } from "@/lib/api";
import { Sliver } from "@/lib/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Sliver[]>([]);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
      setQuery("");
      setResults([]);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchSlivers(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-snow-blue/98 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 pt-24 space-y-12 pb-20">
        <div className="flex items-center justify-between border-b-2 border-slate-blue-gray/10 pb-4">
          <div className="flex items-center gap-4 flex-grow">
            <Search className="h-8 w-8 text-slate-blue-gray/40" />
            <input
              autoFocus
              type="text"
              placeholder="Searching for resonance..."
              className="bg-transparent text-3xl font-serif text-slate-blue-gray placeholder:text-slate-blue-gray/20 border-none outline-none w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-blue-gray/5 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-slate-blue-gray/60" />
          </button>
        </div>

        {query ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {loading ? (
              <div className="text-center py-12 text-ink-gray/40 font-serif italic">
                Scanning the archives...
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/sliver/${result.id}`}
                    onClick={onClose}
                    className="group block bg-ash-white p-6 rounded-2xl border border-muted-silver/30 hover:border-slate-blue-gray/30 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-sans font-medium text-ink-gray/40 uppercase tracking-widest">
                        {result.type}
                      </span>
                      <ChevronRight className="h-4 w-4 text-ink-gray/20 group-hover:text-slate-blue-gray/60 transition-colors" />
                    </div>
                    <p className="font-serif text-xl text-slate-blue-gray mb-4 line-clamp-2 leading-relaxed">
                      {result.content}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-ink-gray/60">
                      <User className="h-3 w-3" />
                      <span>{result.author}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-ink-gray/40 font-serif italic">
                No echoes found matching your query.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Keeping the original static content as background/placeholder when empty */}
            <section className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest text-ink-gray/50 font-sans font-semibold">
                Categories
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Slivers", icon: FileText },
                  { label: "Authors", icon: User },
                  { label: "Genres", icon: Hash },
                  { label: "Collections", icon: Library },
                ].map((cat) => (
                  <div
                    key={cat.label}
                    className="flex items-center gap-2 px-4 py-2 bg-ash-white border border-muted-silver/30 rounded-full"
                  >
                    <cat.icon className="h-4 w-4 text-ink-gray" />
                    <span className="text-sm text-slate-blue-gray font-medium">
                      {cat.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-widest text-ink-gray/50 font-sans font-semibold">
                Recent Explorations
              </h3>
              <div className="space-y-4">
                {[
                  "Classical Poetry",
                  "Stoicism",
                  "Julian Thorne",
                  "Silence",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 w-full text-left p-2"
                  >
                    <Search className="h-4 w-4 text-ink-gray/40" />
                    <span className="text-lg font-serif text-slate-blue-gray/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
