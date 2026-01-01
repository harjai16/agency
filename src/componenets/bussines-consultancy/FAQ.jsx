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

const FAQ = ({ data }) => {
  return (
    <Section
      aria-label="Consultancy FAQs"
      className="py-10 sm:py-12 md:py-14 lg:py-16 bg-white"
    >
      <div className="max-w-fullhd mx-auto space-y-4 sm:space-y-6">
        <motion.div {...fadeUp(0)} className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            {data.section.tag}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            {data.section.title}
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.05)}
          className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 text-xs sm:text-sm text-gray-600"
        >
          {data.items.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                {faq.question}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default FAQ;

