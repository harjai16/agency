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

const Services = ({ data }) => {
  return (
    <Section
      id="consultancy-services"
      aria-label="Consultancy services"
      className="py-12 sm:py-16 md:py-20 bg-white"
    >
      <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              {data.section.tag}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
              {data.section.title}
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-xl">
              {data.section.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.05)}
          className="grid gap-4 sm:gap-5 md:grid-cols-2"
        >
          {data.items.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group relative flex flex-col rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-5 md:p-6 shadow-[0_16px_38px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  {service.tag}
                </span>
                <span className="text-[11px] text-gray-400">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>

              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3">
                {service.summary}
              </p>

              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                <div className="text-[11px] text-gray-500">
                  <span className="block font-medium text-gray-900">
                    Outcome:
                  </span>
                  <span>{service.outcome}</span>
                </div>
                <span className="text-[11px] text-gray-400 whitespace-nowrap">
                  {service.meta}
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/90 via-transparent to-transparent" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default Services;

