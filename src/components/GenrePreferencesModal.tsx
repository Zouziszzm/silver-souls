"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

interface GenrePreferencesModalProps {
  onClose: () => void;
  initialSelection?: string[];
  onSave: (selected: string[]) => void;
}

const AVAILABLE_GENRES = [
  "Poetry",
  "Philosophy",
  "Literature",
  "Essays",
  "Stoicism",
  "Romanticism",
  "Modernist",
  "Haiku",
  "Dark Academia",
  "Existentialism",
  "Nature",
  "Melancholy",
];

export default function GenrePreferencesModal({
  onClose,
  initialSelection = [],
  onSave,
}: GenrePreferencesModalProps) {
  const [selected, setSelected] = useState<string[]>(initialSelection);

  const toggleGenre = (genre: string) => {
    if (selected.includes(genre)) {
      setSelected(selected.filter((g) => g !== genre));
    } else {
      setSelected([...selected, genre]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-blue-gray/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-muted-silver/50 p-8 space-y-8 relative animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-gray/40 hover:text-slate-blue-gray transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-2">
          <h2 className="text-2xl font-serif text-slate-blue-gray">
            Refine Your Resonance
          </h2>
          <p className="text-sm text-ink-gray/60">
            Select the themes that echo with you. We will curate the silence
            accordingly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {AVAILABLE_GENRES.map((genre) => {
            const isSelected = selected.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`group flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-slate-blue-gray text-white border-slate-blue-gray shadow-md"
                    : "bg-snow-blue text-ink-gray border-muted-silver/50 hover:border-slate-blue-gray/30 hover:bg-ash-white"
                }`}
              >
                <span className="font-medium text-sm">{genre}</span>
                {isSelected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end pt-4 border-t border-muted-silver/20">
          <button
            onClick={() => {
              onSave(selected);
              onClose();
            }}
            className="px-8 py-3 rounded-xl bg-slate-blue-gray text-white font-medium hover:bg-slate-blue-gray/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
