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

const Benefits = ({ data }) => {
  return (
    <Section
      aria-label="Why choose our consultancy"
      className="py-12 sm:py-16 md:py-20 bg-gray-50"
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

        <motion.div
          {...fadeUp(0.05)}
          className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4"
        >
          {data.items.map((benefit, index) => (
            <div
              key={index}
              className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] flex flex-col"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default Benefits;

