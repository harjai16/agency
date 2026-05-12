"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, delay },
});

export default function ContentSections({ sections, id = "ai-video-content", ariaLabel }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <Section
      id={id}
      aria-label={ariaLabel || "AI video details"}
      className="py-12 sm:py-16 md:py-20 bg-white"
    >
      <div className="max-w-fullhd mx-auto space-y-10 md:space-y-14">
        {sections.map((block, index) => (
          <motion.article
            key={block.title || index}
            {...fadeUp(index * 0.05)}
            className="max-w-3xl space-y-3 md:space-y-4"
          >
            {block.title ? (
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
                {block.title}
              </h2>
            ) : null}
            {Array.isArray(block.paragraphs)
              ? block.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed"
                  >
                    {p}
                  </p>
                ))
              : null}
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
