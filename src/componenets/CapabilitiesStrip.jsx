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
      <div className="border-y border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="w-full max-w-full px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Small label */}
          <div className="text-xs text-bold md:text-sm text-black whitespace-nowrap">
            We help teams across
          </div>

          {/* Marquee */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="flex items-center gap-8 md:gap-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 22,
                ease: "linear",
              }}
            >
              {LOOP_WORDS.map((word, idx) => (
                <span
                  key={word + idx}
                  className="text-xs md:text-sm uppercase tracking-[0.18em] text-black whitespace-nowrap opacity-100 hover:opacity-80 transition-opacity hover:cursor-pointer"
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
