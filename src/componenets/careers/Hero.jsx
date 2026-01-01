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

const Hero = ({ data }) => {
  return (
    <Section className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20">
      <motion.div {...fadeUp(0)} className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {data.badge}
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
          {data.title}{" "}
          <span className="inline-block border-b border-gray-300 pb-1">
            {data.titleHighlight}
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
          {data.description}
        </p>
      </motion.div>
    </Section>
  );
};

export default Hero;

