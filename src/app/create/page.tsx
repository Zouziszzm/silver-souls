"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Quote,
  Feather,
  BookOpen,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;
type SliverType = "Quote" | "Poem" | "Literature" | "Essay";

const TYPE_CONFIG = {
  Quote: { icon: Quote, desc: "A brief resonance from another or yourself." },
  Poem: { icon: Feather, desc: "Verse that breathes in the silent spaces." },
  Literature: { icon: BookOpen, desc: "A fragment of a larger narrative." },
  Essay: {
    icon: PenTool,
    desc: "A structured reflection on a single thought.",
  },
};

export default function CreateSliverPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState<SliverType | null>(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [attribution, setAttribution] = useState("");

  const nextStep = () => setStep((s) => (s < 4 ? s + 1 : s) as Step);
  const prevStep = () => setStep((s) => (s > 1 ? s - 1 : s) as Step);

  const isStepValid = () => {
    if (step === 1) return type !== null;
    if (step === 2) return content.trim().length > 10;
    if (step === 3) return true;
    return true;
  };

  // ... inside CreateSliverPage component ...
  const handlePublish = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("ss_token") : null;

    if (!token) {
      if (
        confirm(
          "You must be logged in to release a Sliver into the world. Sign in now?"
        )
      ) {
        window.location.href = "http://localhost:4000/auth/google";
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/slivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: type?.toUpperCase(),
          contentText: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to release sliver");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Failed to release sliver into the silence.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pt-24 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={step === 1 ? () => router.back() : prevStep}
          className="p-2 hover:bg-slate-blue-gray/5 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-slate-blue-gray/60" />
        </button>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 w-8 rounded-full transition-all duration-300",
                step >= s ? "bg-slate-blue-gray" : "bg-muted-silver/30"
              )}
            />
          ))}
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-grow flex flex-col">
        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* ... step 1 content ... */}
            <header className="text-center space-y-4">
              <h1 className="text-4xl font-serif text-slate-blue-gray">
                Select Form
              </h1>
              <p className="text-ink-gray">How should your words take shape?</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Object.keys(TYPE_CONFIG) as SliverType[]).map((t) => {
                const Icon = TYPE_CONFIG[t].icon;
                const isSelected = type === t;
                return (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={cn(
                      "p-8 text-left rounded-2xl border transition-all duration-300",
                      isSelected
                        ? "bg-ash-white border-slate-blue-gray shadow-md ring-1 ring-slate-blue-gray/10"
                        : "bg-ash-white/50 border-muted-silver/40 hover:border-muted-silver hover:bg-ash-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-8 w-8 mb-4",
                        isSelected ? "text-slate-blue-gray" : "text-ink-gray/40"
                      )}
                    />
                    <h3 className="text-xl font-serif text-slate-blue-gray mb-2">
                      {t}
                    </h3>
                    <p className="text-sm text-ink-gray/60 leading-relaxed">
                      {TYPE_CONFIG[t].desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 flex-grow flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="text-center space-y-4">
              <h1 className="text-4xl font-serif text-slate-blue-gray">
                The Writing Space
              </h1>
              <p className="text-ink-gray">Let the words arrive.</p>
            </header>
            <textarea
              autoFocus
              className="flex-grow bg-transparent text-2xl font-serif text-slate-blue-gray leading-relaxed placeholder:text-slate-blue-gray/10 border-none outline-none resize-none min-h-[300px]"
              placeholder="Begin typing here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="text-center space-y-4">
              <h1 className="text-4xl font-serif text-slate-blue-gray">
                Context
              </h1>
              <p className="text-ink-gray">
                Provide the metadata of your thought.
              </p>
            </header>
            <div className="max-w-md mx-auto space-y-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-ink-gray/60 font-sans font-semibold">
                  Attribution (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Who spoke these words?"
                  className="w-full bg-ash-white border border-muted-silver/30 rounded-xl p-4 text-slate-blue-gray outline-none focus:border-slate-blue-gray/30 transition-colors"
                  value={attribution}
                  onChange={(e) => setAttribution(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-ink-gray/60 font-sans font-semibold">
                  Tags (Separated by space)
                </label>
                <input
                  type="text"
                  placeholder="e.g. silence reflection dusk"
                  className="w-full bg-ash-white border border-muted-silver/30 rounded-xl p-4 text-slate-blue-gray outline-none focus:border-slate-blue-gray/30 transition-colors"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-12 text-center animate-in fade-in slide-in-from-right-4 duration-500">
            <header className="space-y-4">
              <h1 className="text-4xl font-serif text-slate-blue-gray">
                Release
              </h1>
              <p className="text-ink-gray">
                Your words are ready to join the collective library.
              </p>
            </header>
            <div className="max-w-2xl mx-auto p-12 bg-ash-white border border-muted-silver rounded-3xl shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] uppercase tracking-widest text-ink-gray/30 font-sans">
                  {type}
                </span>
              </div>
              <p className="text-2xl font-serif text-slate-blue-gray italic leading-relaxed mb-8">
                &ldquo;{content}&rdquo;
              </p>
              <p className="text-slate-blue-gray font-medium">
                — {attribution || "Original Thought"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex justify-center">
        {step < 4 ? (
          <button
            disabled={!isStepValid()}
            onClick={nextStep}
            className={cn(
              "flex items-center gap-3 px-12 py-4 rounded-full font-medium transition-all duration-300",
              isStepValid()
                ? "bg-slate-blue-gray text-ash-white hover:translate-x-1 shadow-md"
                : "bg-muted-silver/20 text-ink-gray/30 cursor-not-allowed"
            )}
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="flex items-center gap-3 px-12 py-4 bg-slate-blue-gray text-ash-white rounded-full font-medium hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            Release into the Silence
            <Check className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
