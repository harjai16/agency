"use client";
import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";

const WORDS = [
  "Development",
  "Studio",
  "Strategy",
  "Branding",
  "Agency",
  "Design",
  "Interaction",
  "Element",
  "Digital Solution",
];

// duplicate for seamless loop
const LOOP_WORDS = [...WORDS, ...WORDS];

const CapabilitiesStrip = () => {
  return (
    <section
      aria-label="Agency capabilities"
      className=" bg-white"
    >
      <div className="border-y border-gray-100 bg-white/90 sm:bg-white/80 backdrop-blur-sm">
        <div className="max-w-fullhd mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 py-2.5 sm:py-3 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4">
          {/* Small label */}
          <div className="text-[10px] sm:text-xs md:text-sm text-black font-medium sm:font-normal whitespace-nowrap flex-shrink-0">
            We help teams across
          </div>

          {/* Marquee */}
          <div className="relative flex-1 overflow-hidden min-w-0 w-full sm:w-auto">
            <motion.div
              className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
            >
              {LOOP_WORDS.map((word, idx) => (
                <span
                  key={word + idx}
                  className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.18em] text-black whitespace-nowrap opacity-100 hover:opacity-80 transition-opacity hover:cursor-pointer font-medium"
                >
                  {word}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesStrip;
