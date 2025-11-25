"use client";
import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import Button from "./ui/Button";
import services from "@/data/services.json";

const cardVariants = {
  initial: { opacity: 0, y: 18 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

const Services = () => {
  return (
    <Section
      id="services"
      aria-label="Services we offer"
      className="py-20 md:py-10 bg-white"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div className="max-w-7xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Services
          </p>
   <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
  From concept to a fully launched website,  we partner with you at every stage.
</h2>

<p className="text-sm md:text-base text-gray-500 max-w-6xl">
  We design, develop and optimize high-performance websites built to convert. No guesswork — just measurable improvements in visibility and revenue.
</p>

        </div>

      
      </div>

      {/* Services Grid */}
      <div className="grid gap-5 md:gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.article
            key={service.id}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-sm p-5 md:p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                {service.tag}
              </span>
              <span className="text-[11px] rounded-full border border-gray-200 px-2 py-1 text-gray-600 group-hover:border-gray-900 group-hover:text-gray-900 transition-colors">
                {service.meta}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
              {service.label}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              {service.description}
            </p>

            {/* Outcome */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <p className="max-w-[70%]">
                <span className="font-medium text-gray-900">
                  Outcome:
                </span>{" "}
                {service.outcome}
              </p>
              <button className="text-[11px] font-medium text-gray-700 underline-offset-4 group-hover:underline">
                Learn more
              </button>
            </div>

            {/* Subtle hover overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/80 via-transparent to-transparent" />
          </motion.article>
        ))}
      </div>
    </Section>
  );
};

export default Services;
