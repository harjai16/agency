"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./ui/Section";
import Button from "./ui/Button";
import caseStudies from "@/data/case-studies.json";

const CaseStudies = () => {
  return (
    <Section
      id="work"
      aria-label="Website case studies and recent work"
      className="py-20 md:py-28 bg-white"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
        <div className="max-w-7xl space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Case studies
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
            A few websites we&apos;ve designed
           and built for growing brands.
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-5xl">
            From marketing sites to product dashboards, we partner with teams to
            launch fast, responsive and SEO-friendly websites that actually
            move the numbers—load time, conversion and revenue.
          </p>
        </div>


    <Button
  variant="ghost"
  className="self-start md:self-auto"
onClick={() =>
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
  View all case studies
  </Button>
      </div>

      {/* Grid */}
   {/* Grid */}
{/* Grid */}
<div className="grid gap-6 md:grid-cols-3">
  {caseStudies.map((item, index) => {
    const isTall = index % 2 === 0; // even cards tall

    return (
      <motion.article
        key={item.id}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: index * 0.06 }}
        whileHover={{ y: -6 }}
        className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all
          ${isTall ? "h-[420px] md:h-[450px]" : "h-[400px] md:h-[420px]"}
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
          <div className="relative flex h-full items-end justify-between px-4 pb-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-gray-200">
                {item.industry}
              </div>
              <div className="text-sm font-semibold text-white">
                {item.client}
              </div>
            </div>
            {item.metric && (
              <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50/95 px-2 py-1 text-emerald-700">
                {item.metric}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col px-4 py-4">
          <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-3 line-clamp-4">
            {item.snippet}
          </p>

          <div className="mt-auto flex items-center justify-between text-[11px] text-gray-500">
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


    </Section>
  );
};

export default CaseStudies;
