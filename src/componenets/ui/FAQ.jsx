"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FAQ_ITEMS } from "@/data/faq";
import Section from "./Section";

const FAQ = ({
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about working with our agency.",
  items = FAQ_ITEMS,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section
      className="w-full bg-white py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-fullhd px-4">
        {/* Header */}
        <header className="mb-10 max-w-4xl">
          <h2 className="text-l font-medium uppercase tracking-[0.18em] text-neutral-500">
            FAQ
          </h2>
          <h2
            id="faq-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            {subtitle}
          </p>
        </header>

        {/* FAQ list */}
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item, index) => {
            const isOpen = index === activeIndex;

            return (
              <article key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-4 text-left"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-neutral-900">
                    {item.question}
                  </span>
                  <span
                    className={clsx(
                      "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium transition",
                      isOpen
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-500"
                    )}
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="pb-4 pr-8 text-sm leading-relaxed text-neutral-500">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
