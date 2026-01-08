import React from "react";

export const SilverSoulLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-muted-silver/20"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-slate-blue-gray animate-spin"></div>
      </div>
      <p className="text-sm font-serif italic text-ink-gray/50 animate-pulse">
        Gathering thoughts...
      </p>
    </div>
  );
};
