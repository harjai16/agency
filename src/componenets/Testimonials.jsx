"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Section from "./ui/Section";
import Button from "./ui/Button";
import testimonials from "@/data/testimonials.json";

const Testimonials = () => {
  const perPage = 3;

  // Build pages of up to 3 testimonials each
  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      chunks.push(testimonials.slice(i, i + perPage));
    }
    return chunks;
  }, []);

  const [page, setPage] = useState(0);
  const hasSlider = pages.length > 1;

  const goNext = () => {
    setPage((prev) => (prev + 1) % pages.length);
  };

  const goPrev = () => {
    setPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const currentPageItems = pages[page] || [];

  return (
    <Section
      id="testimonials"
      aria-label="Client testimonials"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
        <div className="space-y-2 sm:space-y-3 max-w-7xl">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Testimonials
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            Brands that build with us
            <br className="hidden md:block" /> keep coming back for results.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-5xl">
    From the first kickoff call to post-launch support — our clients trust us to
    deliver websites that are fast, beautiful, and built to convert. Here’s what
    they have to say.
  </p>
</div>


<Button variant="ghost" className="self-start md:self-auto">
  Get a free website audit
</Button>

      </div>

      {/* Grid area – becomes a slider when pages > 1 */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentPageItems.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
              >
                {/* Avatar + name row */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {/* <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden border border-gray-100 bg-gray-100 flex-shrink-0">
                    {item.avatar && (
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 32px, 40px"
                      />
                    )}
                  </div> */}
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-500 truncate">
                      {item.role}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4">
                  {item.quote}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] rounded-full border border-gray-100 bg-gray-50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-600 truncate">
                      {item.company}
                    </span>
                    <span className="text-[9px] sm:text-[10px] md:text-[11px] text-gray-400 text-right whitespace-nowrap">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Hover accent */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/80 via-transparent to-transparent" />
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Slider controls (only if we have more than 3 testimonials) */}
        {hasSlider && (
          <div className="mt-6 flex items-center justify-between">
            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xs hover:border-gray-900 hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonials"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xs hover:border-gray-900 hover:bg-gray-50 transition-colors"
                aria-label="Next testimonials"
              >
                →
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {pages.map((_, i) => {
                const isActive = i === page;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    className="group relative flex items-center"
                    aria-label={`Go to testimonials set ${i + 1}`}
                  >
                    <div
                      className={[
                        "h-1.5 rounded-full transition-all duration-300",
                        isActive ? "w-6 bg-gray-900" : "w-2 bg-gray-300",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default Testimonials;
