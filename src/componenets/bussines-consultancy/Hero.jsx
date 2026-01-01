"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import { useRouter } from "next/navigation";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const Hero = ({ data }) => {
  const router = useRouter();

  return (
    <Section
      id="consultancy-hero"
      aria-label="Business consultancy services"
      className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20"
    >
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 items-center">
        <motion.div {...fadeUp(0)} className="space-y-6 max-w-xl">
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

          <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
            {data.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => router.push("/contact")}>
              Schedule a consultation
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/case-studies")}
            >
              See our results
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500">
            {data.stats.map((stat, index) => (
              <div key={index}>
                <div className="font-semibold text-gray-900 text-base">
                  {stat.value}
                </div>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="relative">
          <div className="pointer-events-none absolute -top-10 -right-4 h-40 w-40 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-3xl" />
          <div className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 md:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                  {data.card.label}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {data.card.title}
                </div>
              </div>
              <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
                {data.card.badge}
              </span>
            </div>

            <ul className="space-y-3 text-xs md:text-sm text-gray-600">
              {data.card.items.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>

            <p className="text-[11px] text-gray-400">{data.card.footer}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;

