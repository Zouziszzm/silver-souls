"use client";

import React, { useState } from "react";
import { X, Lock, Globe } from "lucide-react";
import { createCollection } from "@/lib/api";

interface CreateCollectionModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateCollectionModal({
  onClose,
  onCreated,
}: CreateCollectionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    try {
      const result = await createCollection({
        title,
        description,
        isPublic,
      });

      if (result) {
        onCreated();
        onClose();
      }
    } catch (error) {
      console.error("Failed to create collection", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-blue-gray/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-muted-silver/50 p-6 space-y-6 relative animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-gray/40 hover:text-slate-blue-gray transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-1">
          <h2 className="text-2xl font-serif text-slate-blue-gray">
            Curate Collection
          </h2>
          <p className="text-sm text-ink-gray/60">
            Create a new repository for your gathered slivers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-xs font-semibold uppercase tracking-wider text-ink-gray/60"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Reflections"
              className="w-full px-4 py-2 rounded-lg bg-snow-blue border border-muted-silver/50 focus:border-antique-gold/50 focus:ring-1 focus:ring-antique-gold/50 outline-none transition-all placeholder:text-ink-gray/30 text-slate-blue-gray"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-xs font-semibold uppercase tracking-wider text-ink-gray/60"
            >
              Description <span className="text-ink-gray/30">(Optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this collection about?"
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-snow-blue border border-muted-silver/50 focus:border-antique-gold/50 focus:ring-1 focus:ring-antique-gold/50 outline-none transition-all placeholder:text-ink-gray/30 text-slate-blue-gray resize-none"
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <button
              type="button"
              onClick={() => setIsPublic(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
                !isPublic
                  ? "bg-slate-blue-gray text-white border-slate-blue-gray"
                  : "bg-transparent text-ink-gray/60 border-muted-silver/50 hover:bg-snow-blue"
              }`}
            >
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Private</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPublic(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all ${
                isPublic
                  ? "bg-Antique-gold text-white border-antique-gold bg-[#c5a045]"
                  : "bg-transparent text-ink-gray/60 border-muted-silver/50 hover:bg-snow-blue"
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Public</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!title || loading}
              className="w-full py-3 rounded-xl bg-slate-blue-gray text-white font-medium hover:bg-slate-blue-gray/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {loading ? "Creating..." : "Create Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
