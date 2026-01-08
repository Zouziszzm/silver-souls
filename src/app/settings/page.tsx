"use client";

import React from "react";
import { User, Settings, BellOff, Eye, LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

import GenrePreferencesModal from "@/components/GenrePreferencesModal";

export default function SettingsPage() {
  const router = useRouter();
  const [font, setFont] = React.useState("font-sans");
  const [prefCount, setPrefCount] = React.useState(0);
  const [isPrefModalOpen, setIsPrefModalOpen] = React.useState(false);
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

  // Load preferences
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ss_genre_prefs");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSelectedGenres(parsed);
        setPrefCount(parsed.length);
      } else {
        // Default seed
        setSelectedGenres(["Poetry", "Philosophy", "Essays"]);
        setPrefCount(3);
      }
    }
  }, []);

  // Apply font change
  React.useEffect(() => {
    // We need to access the root element or body to change the variable or class
    // Since Next.js and Tailwind use configured fonts, easiest is to toggle a class on body
    const body = document.body;
    body.classList.remove("font-sans", "font-serif", "font-mono");

    // Map selection to tailwind class
    let fontClass = "font-sans";
    if (font === "Serif Focus") fontClass = "font-serif";
    if (font === "Monospace Draft") fontClass = "font-mono";

    // Default is sans (Inter)
    if (font === "Minimal Sans") fontClass = "font-sans";

    body.classList.add(fontClass);

    // Persist choice (simple local storage)
    if (typeof window !== "undefined") {
      localStorage.setItem("ss_font_pref", font);
    }
  }, [font]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ss_token");
      localStorage.removeItem("ss_onboarded");
      router.push("/login");
    }
  };

  const handlePreferencesSave = (selected: string[]) => {
    setSelectedGenres(selected);
    setPrefCount(selected.length);
    if (typeof window !== "undefined") {
      localStorage.setItem("ss_genre_prefs", JSON.stringify(selected));
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 pt-24 space-y-16">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif text-slate-blue-gray">Settings</h1>
        <p className="text-ink-gray">
          Refine your environment. Silence the noise.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-ink-gray/40 font-sans font-semibold">
            Account
          </h3>
          <div className="bg-ash-white rounded-3xl border border-muted-silver/30 divide-y divide-muted-silver/10 overflow-hidden shadow-sm">
            <button className="w-full flex items-center justify-between p-6 hover:bg-snow-blue/50 transition-colors group">
              <div className="flex items-center gap-4 text-slate-blue-gray font-medium">
                <User className="h-5 w-5 text-ink-gray/40 group-hover:text-slate-blue-gray" />
                <span>Profile Information</span>
              </div>
              <span className="text-xs text-ink-gray/40 italic">
                Elena Vance
              </span>
            </button>
            <button
              onClick={() => setIsPrefModalOpen(true)}
              className="w-full flex items-center justify-between p-6 hover:bg-snow-blue/50 transition-colors group"
            >
              <div className="flex items-center gap-4 text-slate-blue-gray font-medium">
                <Settings className="h-5 w-5 text-ink-gray/40 group-hover:text-slate-blue-gray" />
                <span>Genre Preferences</span>
              </div>
              <span className="text-xs text-ink-gray/40">
                {prefCount} Selected
              </span>
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-ink-gray/40 font-sans font-semibold">
            Environment
          </h3>
          <div className="bg-ash-white rounded-3xl border border-muted-silver/30 divide-y divide-muted-silver/10 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4 text-slate-blue-gray font-medium">
                <Eye className="h-5 w-5 text-ink-gray/40" />
                <span>Reading Layout</span>
              </div>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="bg-transparent text-sm text-ink-gray font-serif focus:outline-none cursor-pointer"
              >
                <option value="Serif Focus">Serif Focus</option>
                <option value="Minimal Sans">Minimal Sans</option>
                <option value="Monospace Draft">Monospace Draft</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4 text-slate-blue-gray font-medium">
                <BellOff className="h-5 w-5 text-ink-gray/40" />
                <span>Disable All Notifications</span>
              </div>
              <input
                type="checkbox"
                checked
                readOnly
                className="h-5 w-5 rounded-lg border-muted-silver text-slate-blue-gray focus:ring-slate-blue-gray"
              />
            </div>
          </div>
        </section>

        <section className="pt-8 border-t border-muted-silver/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 font-medium hover:text-red-500 transition-colors p-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Abandon Session (Logout)</span>
          </button>
        </section>
      </div>

      {isPrefModalOpen && (
        <GenrePreferencesModal
          onClose={() => setIsPrefModalOpen(false)}
          initialSelection={selectedGenres}
          onSave={handlePreferencesSave}
        />
      )}
    </div>
  );
}
