"use client";

import React from "react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
      {/* Abstract Background Element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gradient-to-tr from-muted-silver/20 to-transparent rounded-full blur-3xl opacity-50" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-slate-blue-gray tracking-tight leading-[1.1]">
            Where words <br className="hidden md:block" />
            <span className="italic font-serif text-antique-gold opacity-90">
              gather weight.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-ink-gray/80 max-w-2xl mx-auto font-light leading-relaxed"
        >
          A curated space for quiet thoughts, heavy hearts, and the literature
          that binds them together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-antique-gold/50 to-transparent mx-auto mt-8" />
        </motion.div>
      </div>
    </section>
  );
};
