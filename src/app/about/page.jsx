"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const page = () => {
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <Section
        id="about-hero"
        aria-label="About our website development agency"
        className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20"
      >
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 items-center">
          {/* Left: main text */}
          <motion.div
            {...fadeUp(0)}
            className="space-y-6 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              ABOUT THE STUDIO
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
              Design, development & growth{" "}
              <span className="inline-block border-b border-gray-300 pb-1">
                engineered for modern brands.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              We&apos;re a small, senior team focused on one thing: building
              high-performance websites that become revenue engines — not
              just pretty brochures on the internet.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Talk to the team
              </Button>
             
            </div>
          </motion.div>
 <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto space-y-6">
    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
      Our story
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
      Started in 2024 — built to challenge the "agency way".
    </h2>

    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
      Born in 2024, we’re a modern web studio shaped by developers, designers and
      builders who care more about outcomes than buzzwords. In just a short time,
      we’ve helped ambitious founders and growing brands turn rough ideas into
      polished, conversion-ready websites.
    </p>

    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
      We started this studio because we kept seeing the same problems:
      slow timelines, bloated quotes, agencies that talk more than they ship.
      We flipped the script — lean execution, clear communication and
      accountability that feels like having an internal team.
    </p>

    <blockquote className="border-l-4 border-emerald-500 pl-4 text-sm md:text-base text-gray-900 italic">
      “Our philosophy is simple: do work that matters, with people who care.
      Strategy first, execution second. Fast launches, measurable results.”
    </blockquote>
  </motion.div>
        {/* Right: facts card */}


        </div>
      </Section>
{/* new start  */}
 <Section
        id="about-hero"
        aria-label="About our website development agency"
        className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20"
      >
<motion.div
  {...fadeUp(0.1)}
  className="relative max-w-fullhd mx-auto"
>
  <div className="pointer-events-none absolute -top-12 -right-2 h-32 w-32 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-3xl" />

  <div className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 md:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] max-w-fullhd mx-auto w-full">
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
          Snapshot
        </div>
        <div className="text-sm font-medium text-gray-900">
          Why teams work with us.
        </div>
      </div>
      <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
        4–6 week builds
      </span>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs md:text-sm text-gray-600">
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          Focus
        </p>
        <p>Strategy, UX/UI & development for web.</p>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          Clients
        </p>
        <p>SaaS, D2C, agencies & growing service brands.</p>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          Approach
        </p>
        <p>Conversion-driven, performance-first builds.</p>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          Collaboration
        </p>
        <p>Weekly check-ins, async updates, clear scopes.</p>
      </div>
    </div>

    <p className="mt-4 text-[11px] text-gray-400">
      No bloat, no endless decks — just a focused team solving real
      problems in your funnel, your brand and your product story.
    </p>
  </div>
</motion.div>
</Section>
{/* new end */}
      {/* WHO WE ARE / WHAT WE DO */}
      <Section
        id="who-we-are"
        aria-label="Who we are"
        className="py-10 sm:py-12 md:py-14 lg:py-18 bg-white"
      >
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 max-w-fullhd mx-auto">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              Who we are
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              We&apos;re a small, senior studio of designers and developers who
              care about the details most users never consciously notice — the
              load time before first paint, the spacing in your type, the way a
              button animates when someone&apos;s about to convert.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We plug into your team like an in-house squad: no agency ego, no
              big pitch theater. Just a clear roadmap, good communication and a
              shared obsession with results.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3" id="our-values">
              What we stand for
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-600">
              <li>
                <span className="font-medium text-gray-900">
                  Strategy before screens.
                </span>{" "}
                We align on goals, audience and messaging before pixels move.
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  Performance over decoration.
                </span>{" "}
                Beautiful is useless if it doesn&apos;t load fast or convert.
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  Transparent collaboration.
                </span>{" "}
                You see the roadmap, the progress and the trade-offs in plain
                language.
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  Long-term thinking.
                </span>{" "}
                We build with maintainability, SEO and future features in mind.
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* STATS BAND */}
      <Section
        aria-label="Agency stats"
        className="py-8 sm:py-10 md:py-12 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <motion.div {...fadeUp(0)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              10+
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
             Websites Delivered
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.05)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              10+
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              Happy clients.
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              4–6 weeks
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              Average build time for a new site
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              98%
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              Client satisfaction & repeat work
            </div>
          </motion.div>
        </div>
      </Section>
  
      {/* OUR PROCESS PREVIEW */}
      <Section
        id="about-process"
        aria-label="Our process preview"   
        className="py-12 sm:py-16 md:py-20"
      >
        <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
          <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Process
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
                A simple, clear flow from kickoff to launch.
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-xl">
                No mystery. No disappearing devs. Just a transparent series of
                steps you can follow — and show your stakeholders.
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("process")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View detailed process
            </Button>
          </motion.div>

          <motion.ol
            {...fadeUp(0.05)}
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-xs sm:text-sm text-gray-600"
          >
            {[
              {
                title: "Discovery",
                desc: "We understand your brand, goals, audience and technical realities.",
              },
              {
                title: "Structure & Design",
                desc: "We map pages, flows and UI so every section has a clear job.",
              },
              {
                title: "Build & Integrate",
                desc: "We develop a fast, responsive site on modern, SEO-friendly tech.",
              },
              {
                title: "Launch & Grow",
                desc: "We ship, measure and iterate so the site keeps earning its keep.",
              },
            ].map((item, index) => (
              <li
                key={item.title}
                className="relative rounded-2xl border border-gray-100 bg-white/80 backdrop-blur p-4 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                  Step {String(index + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </li>
            ))}
          </motion.ol>
        </div>
      </Section>

      {/* TECH & STACK */}
      <Section
        aria-label="Tech stack"
        className="py-12 sm:py-16 md:py-18 bg-gray-50"
      >
        <div className="max-w-fullhd mx-auto grid gap-8 sm:gap-10 md:grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <motion.div {...fadeUp(0)}>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Stack
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-2 sm:mb-3">
              Modern tools for fast, maintainable websites.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              We work with a focused, modern stack so we&apos;re never fighting
              our tools. Everything we choose is based on speed, security and
              how easy it is for your team to maintain after handoff.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-600">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">Front-end</p>
                <p>Next.js, React, Tailwind CSS</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">CMS</p>
                <p>WordPress (custom), headless CMS, Sanity, Contentful</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">Integrations</p>
                <p>Analytics, CRM, forms, payments & automation</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">Optimisation</p>
                <p>SEO, performance budgets, accessibility & Core Web Vitals</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-2">
              Ideal partners
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li>• SaaS founders who need a site that matches their product.</li>
              <li>• Service businesses leveling up from a DIY or outdated site.</li>
              <li>• D2C brands focused on product storytelling & conversion.</li>
              <li>• Agencies that need a reliable white-label web team.</li>
            </ul>
            <p className="mt-4 text-[11px] text-gray-400">
              If that sounds like you, we&apos;ll likely be a very good fit.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section
        aria-label="Work with us"
        className="py-16 md:py-20"
      >
        <motion.div
          {...fadeUp(0)}
          className="max-w-fullhd mx-auto text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-900 mb-3">
            Ready to talk?
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            Let&apos;s make your website your best salesperson.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
            Share where you are today, where you want to be, and we&apos;ll
            map out the simplest, highest-impact version of your next website.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
             Schedule a conversation
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse case studies
            </Button>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default page;
