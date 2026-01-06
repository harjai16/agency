"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";
import { useTranslations } from "@/lib/translations-context";
import { createLocalizedHref, getCurrentLocale } from "@/lib/navigation";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const page = () => {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const t = useTranslations();
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
              {t?.about?.badge || "ABOUT THE STUDIO"}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
              {t?.about?.heroTitle || "Website Development Agency"}{" "}
              <span className="inline-block border-b border-gray-300 pb-1">
                {t?.about?.heroSubtitle || "Built for Fast Performance and Business Growth"}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              {t?.about?.heroDescription ? (
                <>
                  {t.about.heroDescription.split('{websites}')[0]}
                  <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
                    {t.about.websites}
                  </Link>
                  {t.about.heroDescription.split('{websites}')[1]?.split('{webDevelopmentAgency}')[0]}
                  <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
                    {t.about.webDevelopmentAgency}
                  </Link>
                  {t.about.heroDescription.split('{webDevelopmentAgency}')[1]?.split('{work}')[0]}
                  <Link href={createLocalizedHref("/portfolio", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
                    {t.about.work}
                  </Link>
                  {t.about.heroDescription.split('{work}')[1]?.split('{caseStudies}')[0]}
                  <Link href={createLocalizedHref("/case-studies", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
                    {t.about.caseStudies}
                  </Link>
                  {t.about.heroDescription.split('{caseStudies}')[1]}
                </>
              ) : (
                <>
                  We&apos;re a small, senior team focused on building high-performance <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">websites</Link> that become revenue engines. Design, development and growth engineered for modern brands. We&apos;re a modern <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">web development agency</Link> shaped by developers, designers and builders who care more about outcomes than buzzwords. See our <Link href={createLocalizedHref("/portfolio", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">work</Link> and <Link href={createLocalizedHref("/case-studies", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">case studies</Link> to understand our approach.
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                {t?.about?.talkToTeam || "Talk to the team"}
              </Button>
             
            </div>
          </motion.div>
 <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto space-y-6">
    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
      {t?.about?.ourStory || "Our story"}
    </p>

    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
      {t?.about?.storyTitle || "Website Development Agency Built in 2024 — Fast Performance Websites for Business Growth"}
    </h2>

    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
      {t?.about?.storyDescription1 ? (
        <>
          {t.about.storyDescription1.split('{webStudio}')[0]}
          <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
            {t.about.webStudio}
          </Link>
          {t.about.storyDescription1.split('{webStudio}')[1]?.split('{conversionReadyWebsites}')[0]}
          <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
            {t.about.conversionReadyWebsites}
          </Link>
          {t.about.storyDescription1.split('{conversionReadyWebsites}')[1]?.split('{portfolio}')[0]}
          <Link href={createLocalizedHref("/portfolio", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
            {t.about.portfolio}
          </Link>
          {t.about.storyDescription1.split('{portfolio}')[1]?.split('{websiteDevelopment}')[0]}
          <Link href={createLocalizedHref("/case-studies", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
            {t.about.websiteDevelopment}
          </Link>
          {t.about.storyDescription1.split('{websiteDevelopment}')[1]}
        </>
      ) : (
        <>
          Born in 2024, we're a modern <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">web studio</Link> shaped by developers, designers and builders who care more about outcomes than buzzwords. In just a short time, we've helped ambitious founders and growing brands turn rough ideas into polished, <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">conversion-ready websites</Link>. Browse our <Link href={createLocalizedHref("/portfolio", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">portfolio</Link> to see examples of our <Link href={createLocalizedHref("/case-studies", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">website development</Link> work.
        </>
      )}
    </p>

    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
      {t?.about?.storyDescription2 ? (
        <>
          {t.about.storyDescription2.split('{websiteDevelopmentAgency}')[0]}
          <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
            {t.about.websiteDevelopmentAgency}
          </Link>
          {t.about.storyDescription2.split('{websiteDevelopmentAgency}')[1]?.split('{webDevelopmentServices}')[0]}
          <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">
            {t.about.webDevelopmentServices}
          </Link>
          {t.about.storyDescription2.split('{webDevelopmentServices}')[1]}
        </>
      ) : (
        <>
          We started this <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">website development agency</Link> because we kept seeing the same problems: slow timelines, bloated quotes, agencies that talk more than they ship. We flipped the script — lean execution, clear communication and accountability that feels like having an internal team. Our <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">web development services</Link> focus on results, not just pretty designs.
        </>
      )}
    </p>

    <blockquote className="border-l-4 border-emerald-500 pl-4 text-sm md:text-base text-gray-900 italic">
      {t?.about?.philosophy || "\"Our philosophy is simple: do work that matters, with people who care. Strategy first, execution second. Fast launches, measurable results.\""}
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
          {t?.about?.snapshot || "Snapshot"}
        </div>
        <div className="text-sm font-medium text-gray-900">
          {t?.about?.whyTeamsWorkWithUs || "Why teams work with us."}
        </div>
      </div>
      <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
        {t?.about?.weekBuilds || "4–6 week builds"}
      </span>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs md:text-sm text-gray-600">
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          {t?.about?.focus || "Focus"}
        </p>
        <p>{t?.about?.focusDesc || "Strategy, UX/UI & development for web."}</p>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          {t?.about?.clients || "Clients"}
        </p>
        <p>{t?.about?.clientsDesc || "SaaS, D2C, agencies & growing service brands."}</p>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          {t?.about?.approach || "Approach"}
        </p>
        <p>{t?.about?.approachDesc || "Conversion-driven, performance-first builds."}</p>
      </div>

      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
          {t?.about?.collaboration || "Collaboration"}
        </p>
        <p>{t?.about?.collaborationDesc || "Weekly check-ins, async updates, clear scopes."}</p>
      </div>
    </div>

    <p className="mt-4 text-[11px] text-gray-400">
      {t?.about?.snapshotFooter || "No bloat, no endless decks — just a focused team solving real problems in your funnel, your brand and your product story."}
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
              {t?.about?.whoWeAre || "Who we are"}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              {t?.about?.whoWeAreDesc1 || "We're a small, senior studio of designers and developers who care about the details most users never consciously notice — the load time before first paint, the spacing in your type, the way a button animates when someone's about to convert."}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {t?.about?.whoWeAreDesc2 || "We plug into your team like an in-house squad: no agency ego, no big pitch theater. Just a clear roadmap, good communication and a shared obsession with results."}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3" id="our-values">
              {t?.about?.whatWeStandFor || "What we stand for"}
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-600">
              <li>
                <span className="font-medium text-gray-900">
                  {t?.about?.strategyBeforeScreens || "Strategy before screens."}
                </span>{" "}
                {t?.about?.strategyBeforeScreensDesc || "We align on goals, audience and messaging before pixels move."}
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  {t?.about?.performanceOverDecoration || "Performance over decoration."}
                </span>{" "}
                {t?.about?.performanceOverDecorationDesc || "Beautiful is useless if it doesn't load fast or convert."}
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  {t?.about?.transparentCollaboration || "Transparent collaboration."}
                </span>{" "}
                {t?.about?.transparentCollaborationDesc || "You see the roadmap, the progress and the trade-offs in plain language."}
              </li>
              <li>
                <span className="font-medium text-gray-900">
                  {t?.about?.longTermThinking || "Long-term thinking."}
                </span>{" "}
                {t?.about?.longTermThinkingDesc || "We build with maintainability, SEO and future features in mind."}
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
             {t?.about?.websitesDelivered || "Websites Delivered"}
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.05)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              10+
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {t?.about?.happyClients || "Happy clients."}
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              4–6 weeks
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {t?.about?.averageBuildTime || "Average build time for a new site"}
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="flex-1 min-w-[140px]">
            <div className="text-2xl md:text-3xl font-semibold text-gray-900">
              98%
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">
              {t?.about?.clientSatisfaction || "Client satisfaction & repeat work"}
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
                {t?.about?.process || "Process"}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
                {t?.about?.processTitle || "Website Development Process Built for Fast Performance and Business Growth"}
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-xl">
                {t?.about?.processDescription || "No mystery. No disappearing devs. Just a transparent series of steps you can follow — and show your stakeholders."}
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
              {t?.about?.viewDetailedProcess || "View detailed process"}
            </Button>
          </motion.div>

          <motion.ol
            {...fadeUp(0.05)}
            className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-xs sm:text-sm text-gray-600"
          >
            {[
              {
                title: t?.about?.discovery || "Discovery",
                desc: t?.about?.discoveryDesc || "We understand your brand, goals, audience and technical realities.",
              },
              {
                title: t?.about?.structureDesign || "Structure & Design",
                desc: t?.about?.structureDesignDesc || "We map pages, flows and UI so every section has a clear job.",
              },
              {
                title: t?.about?.buildIntegrate || "Build & Integrate",
                desc: t?.about?.buildIntegrateDesc || "We develop a fast, responsive site on modern, SEO-friendly tech.",
              },
              {
                title: t?.about?.launchGrow || "Launch & Grow",
                desc: t?.about?.launchGrowDesc || "We ship, measure and iterate so the site keeps earning its keep.",
              },
            ].map((item, index) => (
              <li
                key={item.title}
                className="relative rounded-2xl border border-gray-100 bg-white/80 backdrop-blur p-4 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                  {t?.about?.step || "Step"} {String(index + 1).padStart(2, "0")}
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
              {t?.about?.stack || "Stack"}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-2 sm:mb-3">
              {t?.about?.stackTitle || "Website Development Tools Built for Fast Performance Across Devices"}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              {t?.about?.stackDescription || "We work with a focused, modern stack so we're never fighting our tools. Everything we choose is based on speed, security and how easy it is for your team to maintain after handoff."}
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm text-gray-600">
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{t?.about?.frontEnd || "Front-end"}</p>
                <p>{t?.about?.frontEndTech || "Next.js, React, Tailwind CSS"}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{t?.about?.cms || "CMS"}</p>
                <p>{t?.about?.cmsTech || "WordPress (custom), headless CMS, Sanity, Contentful"}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{t?.about?.integrations || "Integrations"}</p>
                <p>{t?.about?.integrationsTech || "Analytics, CRM, forms, payments & automation"}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{t?.about?.optimisation || "Optimisation"}</p>
                <p>{t?.about?.optimisationTech || "SEO, performance budgets, accessibility & Core Web Vitals"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
          >
            <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-2">
              {t?.about?.idealPartners || "Ideal partners"}
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li>• {t?.about?.idealPartner1 || "SaaS founders who need a site that matches their product."}</li>
              <li>• {t?.about?.idealPartner2 || "Service businesses leveling up from a DIY or outdated site."}</li>
              <li>• {t?.about?.idealPartner3 || "D2C brands focused on product storytelling & conversion."}</li>
              <li>• {t?.about?.idealPartner4 || "Agencies that need a reliable white-label web team."}</li>
            </ul>
            <p className="mt-4 text-[11px] text-gray-400">
              {t?.about?.idealPartnersFooter || "If that sounds like you, we'll likely be a very good fit."}
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
            {t?.about?.readyToTalk || "Ready to talk?"}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            {t?.about?.ctaTitle || "Website Development Built for Fast Performance and Business Growth"}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
            {t?.about?.ctaDescription || "Share where you are today, where you want to be, and we'll map out the simplest, highest-impact version of your next website."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
             {t?.about?.scheduleConversation || "Schedule a conversation"}
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("work")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t?.about?.browseCaseStudies || "Browse case studies"}
            </Button>
          </div>
        </motion.div>
      </Section>
      <SEOBacklinks />
    </main>
  );
};

export default page;
