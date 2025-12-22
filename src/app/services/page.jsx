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
    title: "Website Strategy & Structure",
    summary:
      "We plan page structure, content hierarchy, and user flows so visitors quickly understand what you do and what to do next.",
    outcome: "Clear sitemap, focused messaging, and defined page goals.",
    meta: "Useful before new builds or redesigns",
  },
  {
    id: "ux-ui",
    tag: "Design",
    title: "UX & UI Website Design",
    summary:
      "Clean, mobile-first interfaces designed to be easy to use and aligned with your brand.",
    outcome: "Polished designs ready for development or handoff.",
    meta: "Responsive layouts with key interaction states",
  },
  {
    id: "development",
    tag: "Development",
    title: "Custom Website Development",
    summary:
      "Fast, reliable websites built with modern frameworks like Next.js and React — no heavy themes or shortcuts.",
    outcome: "A performance-focused site tailored to your business needs.",
    meta: "Well-suited for SaaS, service brands, and custom builds",
  },
  {
    id: "cms",
    tag: "CMS",
    title: "CMS & Content Management",
    summary:
      "Flexible CMS setups using WordPress or headless solutions so your team can manage content confidently.",
    outcome: "Editable pages, structured content, and SEO-ready fields.",
    meta: "Includes basic training and documentation",
  },
  {
    id: "performance",
    tag: "Performance & SEO",
    title: "Performance & SEO Improvements",
    summary:
      "We review and improve site speed, technical SEO, and Core Web Vitals to support real-world usage.",
    outcome: "Faster load times, better usability, and stronger visibility.",
    meta: "Best for existing or growing websites",
  },
  {
    id: "support",
    tag: "Support",
    title: "Ongoing Support & Improvements",
    summary:
      "We help keep your site stable, secure, and improving as your product or business evolves.",
    outcome: "Planned updates, small iterations, and ongoing refinements.",
    meta: "Flexible monthly support options",
  },
];

const engagementModels = [
  {
    title: "Project-based builds",
    description:
      "Best for teams that need a complete website build, redesign, or migration with a defined scope.",
    bullets: [
      "Clear scope and predictable timelines",
      "Good fit for new launches or major changes",
      "Typically delivered in 4–6 weeks",
    ],
  },
  {
    title: "Ongoing product partner",
    description:
      "For teams who want consistent design and development support without expanding headcount.",
    bullets: [
      "Monthly engagement with flexible usage",
      "Ongoing updates, fixes, and improvements",
      "Works well for SaaS and evolving products",
    ],
  },
  {
    title: "White-label for agencies",
    description:
      "We support agencies by handling design and development while you stay client-facing.",
    bullets: [
      "Adaptable to your workflows",
      "Discreet and NDA-friendly",
      "Reliable delivery capacity",
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
             Website services built to generate leads, sales, {" "}
              <span className="inline-block border-b border-gray-300 pb-1">
                and real growth.
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
             Strategy, design, and development focused on performance — fast websites that convert visitors into customers.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
               onClick={() => router.push("/contact")}
              >
                Get a free website plan
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/portfolio")}
              >
                View real projects
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500">
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  10+
                </div>
                <div>projects delivered</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  4–6 weeks
                </div>
                <div>weeks typical launch</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                Performance-focused
                </div>
                <div>Performance-first builds</div>
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
                  What a typical website project includes
                  </div>
                </div>
                <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
                  4–6 weeks
                </span>
              </div>

              <ul className="space-y-3 text-xs md:text-sm text-gray-600">
                <li>• Clear strategy aligned with your business goals</li>
                <li>• UX & UI for key pages and conversion flows</li>
                <li>• Performance-focused Next.js or WordPress build</li>
                <li>• SEO, analytics, and launch support baked in</li>
              </ul>

              <p className="text-[11px] text-gray-400">
               No templates. No copy-paste packages. Built for your needs.
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
               Most projects are completed in 4–6 weeks. Timelines depend on scope, content readiness, and feedback cycles. We’ll confirm a clear timeline before starting.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
               Do you handle full projects or just specific parts?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Both. We can manage everything from strategy to launch, or support your team
  with design or development only.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
              Can our team update content after launch?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Yes. We use CMS and reusable components so your team can update pages, text,
  and SEO fields without technical help.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">
                What’s the first step to get started?
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
              We start with a short call to understand your goals and constraints. After
  that, we share a clear scope, timeline, and next steps.
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
          Let’s plan a website that actually delivers results
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
          One short call. Clear next steps. No pressure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
               onClick={() => router.push("/contact")}
            >
            Get a free website plan
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
