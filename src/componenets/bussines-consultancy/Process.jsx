"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const Process = ({ data }) => {
  return (
    <Section
      aria-label="Our consulting process"
      className="py-12 sm:py-16 md:py-20 bg-white"
    >
      <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
        <motion.div {...fadeUp(0)} className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            {data.section.tag}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            {data.section.title}
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500">
            {data.section.description}
          </p>
        </motion.div>

        <motion.ol
          {...fadeUp(0.05)}
          className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-xs sm:text-sm text-gray-600"
        >
          {data.steps.map((step, index) => (
            <li
              key={index}
              className="relative rounded-2xl border border-gray-100 bg-white/80 backdrop-blur p-4 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                Step {String(index + 1).padStart(2, "0")}
              </div>
              <div className="font-semibold text-gray-900 mb-1">
                {step.title}
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
};

export default Process;

