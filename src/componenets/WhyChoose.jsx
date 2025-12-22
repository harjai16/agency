"use client";

import React from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    id: 1,
    label: "Outcome-driven",
    title: "We focus on measurable results",
    description:
      "Every project is tied to clear KPIs—conversion, lead quality, engagement or revenue—so design work is always aligned with business outcomes.",
  },
  {
    id: 2,
    label: "Senior only",
    title: "You work with a lean expert team",
    description:
      "No handoffs between layers of account managers. You speak directly with the designers and strategists doing the work.",
  },
  {
    id: 3,
    label: "Fast & reliable",
    title: "Ship weeks faster, without chaos",
    description:
      "Opinionated process, tight feedback loops and async communication keep projects moving without endless meetings.",
  },
  {
    id: 4,
    label: "Built to last",
    title: "Websites that are easy to maintain",
    description:
      "Clean, component-based builds on modern stacks so your team can evolve pages, not rebuild them from scratch.",
  },
];

const WhyChoose = () => {
  return (
    <section
      id="why-choose-us"
      aria-label="Why clients choose to work with us"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white"
    >
      <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] text-slate-900">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            Why choose us
          </p>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            A partner that feels like part of your team.
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto text-slate-900 px-4">
            We combine product thinking, brand clarity and modern engineering
            to build websites that look sharp, load fast and actually move
            the business forward.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 lg:py-7 shadow-[0_18px_40px_rgba(15,23,42,0.04)] group"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-lime-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-[1] space-y-2 sm:space-y-3">
                <p className="inline-flex items-center text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-gray-500">
                  {item.label}
                </p>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 justify-center border-t border-gray-200 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-xs sm:text-sm text-gray-900">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gray-500 mb-1">
              Projects
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">50+ launches</p>
            <p className="text-[10px] sm:text-xs mt-1 text-gray-600">
              Across SaaS, agencies, B2B and DTC brands.
            </p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gray-500 mb-1">
              Performance
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              &lt; 2s avg. load
            </p>
            <p className="text-[10px] sm:text-xs mt-1 text-gray-600">
              Core web vitals baked into the process.
            </p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gray-500 mb-1">
              Relationships
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-900">
              90% repeat clients
            </p>
            <p className="text-[10px] sm:text-xs mt-1 text-gray-600">
              Most teams stay with us for multiple product cycles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
