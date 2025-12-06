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
      className="py-3 md:py-3"
    >
      <div className="max-w-fullhd mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[21px] uppercase tracking-[0.22em] text-slate-900">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            Why choose us
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            A partner that feels like part of your team.
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto text-slate-900">
            We combine product thinking, brand clarity and modern engineering
            to build websites that look sharp, load fast and actually move
            the business forward.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {reasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6 md:px-6 md:py-7 shadow-[0_18px_40px_rgba(15,23,42,0.55)] backdrop-blur-xl group"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-lime-400/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-[1] space-y-3">
                <p className="inline-flex items-center text-[11px] uppercase tracking-[0.22em] text-slate-900">
                  {item.label}
                </p>
                <h3 className="text-base md:text-lg font-semibold text-white text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300/90 leading-relaxed text-slate-900">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <div className="mt-12 pt-6 justify-center border-t border-white/10 grid gap-6 md:grid-cols-3 text-sm text-slate-900">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-900 mb-1">
              Projects
            </p>
            <p className="text-xl font-semibold text-slate-900">50+ launches</p>
            <p className="text-xs mt-1 text-slate-900">
              Across SaaS, agencies, B2B and DTC brands.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-900 mb-1">
              Performance
            </p>
            <p className="text-xl font-semibold text-black">
              &lt; 2s avg. load
            </p>
            <p className="text-xs mt-1 text-slate-900">
              Core web vitals baked into the process.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-900 mb-1">
              Relationships
            </p>
            <p className="text-xl font-semibold text-black">
              90% repeat clients
            </p>
            <p className="text-xs mt-1 text-slate-900">
              Most teams stay with us for multiple product cycles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
