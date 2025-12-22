"use client";

import React, { use } from "react";
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

const services = [
  {
    id: "strategy",
    tag: "Strategy",
    title: "Website Strategy & Architecture",
    summary:
      "We define your site structure, key pages and user journeys so every screen has a clear job.",
    outcome: "Clear sitemap, page priorities and messaging framework.",
    meta: "Ideal before redesigns or new builds",
  },
  {
    id: "ux-ui",
    tag: "Design",
    title: "UX & UI Website Design",
    summary:
      "Modern, on-brand interfaces that feel intuitive, mobile-first and conversion-focused.",
    outcome: "High-fidelity designs ready to hand off or build.",
    meta: "Includes responsive states & key interactions",
  },
  {
    id: "development",
    tag: "Development",
    title: "Custom Website Development",
    summary:
      "Fast, secure websites built on Next.js, React and modern tooling — no bloated themes.",
    outcome: "High-performance site tailored to your brand and goals.",
    meta: "Best for SaaS, agencies & service brands",
  },
  {
    id: "cms",
    tag: "CMS",
    title: "CMS & Content Systems",
    summary:
      "Flexible content management using WordPress or headless CMS so your team can make updates easily.",
    outcome: "Editable pages, blog, SEO fields and reusable blocks.",
    meta: "Training + documentation included",
  },
  {
    id: "performance",
    tag: "Performance & SEO",
    title: "Performance & SEO Optimization",
    summary:
      "We audit, fix and tune your site for Core Web Vitals, technical SEO and real-world speed.",
    outcome: "Better rankings, improved UX and reduced drop-offs.",
    meta: "Great for existing websites",
  },
  {
    id: "support",
    tag: "Support",
    title: "Ongoing Support & Iteration",
    summary:
      "A proactive partner to keep your site updated, secure and improving month over month.",
    outcome: "Roadmap, A/B tests and continuous improvements.",
    meta: "Retainers from 10–40 hours/month",
  },
];

const engagementModels = [
  {
    title: "Project-based builds",
    description:
      "Perfect for full website launches, redesigns or migrations with a clear beginning and end.",
    bullets: [
      "Fixed scope & pricing",
      "Ideal for new sites or major overhauls",
      "4–8 week average timelines",
    ],
  },
  {
    title: "Ongoing product partner",
    description:
      "Best for teams who want a dedicated design & dev partner without hiring in-house.",
    bullets: [
      "Monthly retainer with flexible hours",
      "Continuous experiments & improvements",
      "Great for SaaS & high-growth teams",
    ],
  },
  {
    title: "White-label for agencies",
    description:
      "We handle design and/or development behind the scenes while you manage the client.",
    bullets: [
      "Your process, our execution",
      "Invisible partner, NDA-friendly",
      "Reliable capacity for your projects",
    ],
  },
];

const ServicesPage = () => {

   const router = useRouter();
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <Section
        id="services-hero"
        aria-label="Website development services"
        className="pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16 md:pb-20"
      >
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 items-center">
          {/* Left text */}
          <motion.div {...fadeUp(0)} className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              SERVICES
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
              Website services designed to{" "}
              <span className="inline-block border-b border-gray-300 pb-1">
                move your metrics
              </span>
              , not just your brand.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              From strategy and UX to development and performance, we help you
              build, launch and grow websites that are fast, flexible and built
              for real business results.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
               onClick={() => router.push("/contact")}
              >
                Book a strategy call
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/services")}
              >
                Explore all services
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500">
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  120+
                </div>
                <div>Websites launched</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  4–6 weeks
                </div>
                <div>Average build time</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  98%
                </div>
                <div>Client satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="pointer-events-none absolute -top-10 -right-4 h-40 w-40 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-3xl" />
            <div className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 md:p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)] space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                    Typical project
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    From audit to launch.
                  </div>
                </div>
                <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
                  4–6 weeks
                </span>
              </div>

              <ul className="space-y-3 text-xs md:text-sm text-gray-600">
                <li>• Strategy & sitemap aligned to your goals</li>
                <li>• UX/UI design for key pages and flows</li>
                <li>• Next.js build with responsive layouts</li>
                <li>• SEO, performance and analytics wired in</li>
              </ul>

              <p className="text-[11px] text-gray-400">
                Every engagement is scoped around your goals, timeline and team
                capacity — no copy-paste “packages”.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SERVICES GRID */}
      <Section
        id="services-list"
        aria-label="Detailed services"
        className="py-12 sm:py-16 md:py-20 bg-white"
      >
        <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
          <motion.div
            {...fadeUp(0)}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                What we do
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
                Everything you need to design, build and grow your website.
              </h2>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500 max-w-xl">
                Choose a single service or partner with us end-to-end. Either
                way, you get a senior team focused on performance and
                conversions.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.05)}
            className="grid gap-4 sm:gap-5 md:grid-cols-2"
          >
            {services.map((service, index) => (
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

      {/* ENGAGEMENT MODELS */}
      <Section
        aria-label="How we work"
        className="py-12 sm:py-16 md:py-20 bg-gray-50"
      >
        <div className="max-w-fullhd mx-auto space-y-6 sm:space-y-8">
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              How we work
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
              Simple, flexible ways to work together.
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500">
              Whether you&apos;re launching something new or leveling up what
              you already have, we&apos;ll suggest the model that fits your
              stage, budget and team.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.05)}
            className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {engagementModels.map((model, index) => (
              <div
                key={model.title}
                className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-5 shadow-[0_14px_32px_rgba(15,23,42,0.04)] flex flex-col"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                  Option {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2">
                  {model.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3">
                  {model.description}
                </p>
                <ul className="space-y-1 text-[11px] md:text-xs text-gray-500 mb-4">
                  {model.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-2 text-[11px] text-gray-400">
                  We&apos;ll recommend this if it fits your goals in our first call.
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* MICRO FAQ BLOCK */}
      <Section
        aria-label="Service FAQs"
        className="py-10 sm:py-12 md:py-14 lg:py-16 bg-white"
      >
        <div className="max-w-fullhd mx-auto space-y-4 sm:space-y-6">
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              FAQs
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
              A few quick answers before we talk.
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp(0.05)}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 text-xs sm:text-sm text-gray-600"
          >
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                How long does a typical website project take?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Most projects land between 4–6 weeks depending on scope,
                content readiness and integrations. We&apos;ll give you a clear
                timeline before we start.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                Do you only work end-to-end, or just design / dev?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Both. You can bring us in for full strategy + design + build,
                or just the part your team needs help with.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                Will we be able to update the website ourselves?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Yes. We build with CMS and reusable components so your team can
                edit content without touching code.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                How do we get started?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Start with a short call where we understand your goals, timeline
                and constraints. From there, we propose scope, pricing and a
                clear path to launch.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <Section
        aria-label="Service page final CTA"
        className="py-16 md:py-20 bg-gray-50"
      >
        <motion.div
          {...fadeUp(0)}
          className="max-w-fullhd mx-auto text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
            Next step
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            Tell us what you&apos;re trying to ship.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
            One quick call, zero pressure. If we&apos;re a fit, we&apos;ll map
            out a concrete plan for your next website release — timelines,
            budget and deliverables included.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
               onClick={() => router.push("/contact")}
            >
              Book a strategy call
            </Button>
            <Button
              variant="ghost"
            onClick={() => router.push("/case-studies")}
            >
              View case studies
            </Button>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default ServicesPage;
