"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./ui/Section";
import Button from "./ui/Button";
import caseStudies from "@/data/case-studies.json";
import { useRouter } from "next/navigation";

const SLIDE_DURATION = 3000; // 5s per slide

const CaseStudies = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.querySelectorAll("article");
    const card = cards[index];
    if (!card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const left =
      cardRect.left - containerRect.left + container.scrollLeft;

    container.scrollTo({
      left,
      behavior: "smooth",
    });
  };

  // Autoplay: move to next slide when duration is over
  useEffect(() => {
    if (!caseStudies.length) return;

    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % caseStudies.length;
      scrollToIndex(nextIndex);
      setActiveIndex(nextIndex);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <Section
      id="work"
      aria-label="Website case studies and recent work"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
        <div className="space-y-2 sm:space-y-3 max-w-7xl">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Case studies
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            A few websites we&apos;ve designed and built for growing brands.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-5xl">
            From marketing sites to product dashboards, we partner with teams to
            launch fast, responsive and SEO-friendly websites that actually move
            the numbers—load time, conversion and revenue.
          </p>
        </div>

        <Button
          variant="ghost"
          className="self-start md:self-auto"
          onClick={() => router.push("/case-studies")}
        >
          View all case studies
        </Button>
      </div>

      {/* Slider wrapper */}
      <div className="relative">
        {/* Slider track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-6 hide-scrollbar"
        >
          {caseStudies.map((item, index) => {
            const isTall = index % 2 === 0;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className={`
                  group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 
                  bg-white/80 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.04)] 
                  transition-all snap-start shrink-0
                  w-[85%] sm:w-[70%] md:w-[48%] lg:w-[32%]
                  ${isTall ? "h-[380px] sm:h-[400px] md:h-[420px] lg:h-[450px]" : "h-[360px] sm:h-[380px] md:h-[400px] lg:h-[420px]"}
                `}
              >
                {/* Top visual */}
                <div className="relative h-1/2 md:h-[55%] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="relative flex h-full items-end justify-between px-3 sm:px-4 pb-2 sm:pb-3">
                    <div>
                      <div className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-gray-200">
                        {item.industry}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {item.client}
                      </div>
                    </div>
                    {item.metric && (
                      <span className="text-[9px] sm:text-[10px] md:text-[11px] rounded-full border border-emerald-100 bg-emerald-50/95 px-1.5 sm:px-2 py-0.5 sm:py-1 text-emerald-700">
                        {item.metric}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-3 sm:px-4 py-3 sm:py-4">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-2 sm:mb-3 line-clamp-4">
                    {item.snippet}
                  </p>

                  <div className="mt-auto flex items-center justify-between text-[9px] sm:text-[10px] md:text-[11px] text-gray-500">
                    <span>{item.meta}</span>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1 font-medium text-gray-800 group-hover:text-black group-hover:gap-1.5 transition-all"
                    >
                      Read case study
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

       
      </div>
    </Section>
  );
};

export default CaseStudies;
