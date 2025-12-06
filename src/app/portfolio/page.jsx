"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import caseStudies from "@/data/case-studies.json";
import portfolio from "@/data/portfolio.json";
import { useRouter } from "next/navigation";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const PortfolioPage = () => {
  const [featured, ...rest] = caseStudies;
const router = useRouter();
  return (
    <main className="bg-white text-gray-900">
      {/* HERO */}
      <Section
        id="portfolio-hero"
        aria-label="Portfolio of work"
        className="pt-4 pb-16 md:pt-4 md:pb-20"
      >
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left text */}
          <motion.div {...fadeUp(0)} className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Portfolio
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[2.7rem] font-semibold tracking-tight text-gray-900">
              Websites and digital products{" "}
              <span className="inline-block border-b border-gray-300 pb-1">
                we&apos;ve shipped
              </span>{" "}
              for teams who care about results.
            </h1>

            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-xl">
              A curated snapshot of recent work across SaaS, e-commerce,
              fintech and modern service brands. Every project started with a
              clear metric — faster load times, higher conversions, fewer
              support tickets — and shipped with those goals in mind.
            </p>

            <div className="flex flex-wrap items-center gap-3">
             <Button
      onClick={() => router.push("/contact")}
    >
      Start a project
    </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  document
                    .getElementById("portfolio-list")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Browse the work
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500">
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  120+
                </div>
                <div>Web projects delivered</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  40+
                </div>
                <div>Clients across industries</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">
                  4–6 weeks
                </div>
                <div>Average build time</div>
              </div>
            </div>
          </motion.div>

          {/* Right: featured card */}
          {featured && (
            <motion.div {...fadeUp(0.1)} className="relative">
              <div className="pointer-events-none absolute -top-10 -right-4 h-40 w-40 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-3xl" />
              <Link href={featured.href} className="block">
                <article className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur shadow-[0_22px_55px_rgba(15,23,42,0.10)]">
                  {/* Image */}
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    {featured.image && (
                      <Image
                        src={featured.image}
                        alt={featured.imageAlt || featured.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="relative flex h-full items-end justify-between px-5 pb-4">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-gray-200">
                          {featured.industry}
                        </div>
                        <div className="text-sm font-semibold text-white">
                          {featured.client}
                        </div>
                      </div>
                      {featured.metric && (
                        <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50/95 px-2 py-1 text-emerald-700">
                          {featured.metric}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-5 pt-4 pb-5 space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                      Featured case study
                    </p>
                    <h2 className="text-sm md:text-base font-semibold text-gray-900">
                      {featured.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {featured.snippet}
                    </p>
                    <div className="flex items-center justify-between pt-2 text-[11px] text-gray-500">
                      <span>{featured.meta}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-gray-800 hover:text-black hover:gap-1.5 transition-all">
                        View project <span className="text-xs">↗</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          )}
        </div>
      </Section>

      {/* PORTFOLIO LIST */}
      <Section
        id="portfolio-list"
        aria-label="Portfolio projects"
        className="pb-20 md:pb-24 bg-white"
      >
        <div className="max-w-fullhd mx-auto space-y-8">
          {/* Filter row (visual only for now) */}
          <motion.div
            {...fadeUp(0)}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="text-xs md:text-sm text-gray-500">
              Showing {caseStudies.length} projects across SaaS, e-commerce and
              fintech.
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] md:text-xs">
              <button className="rounded-full border border-gray-900 bg-gray-900 px-3 py-1 text-white">
                All work
              </button>
              <button className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300">
                SaaS
              </button>
              <button className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300">
                E-commerce
              </button>
              <button className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 hover:border-gray-300">
                Fintech
              </button>
            </div>
          </motion.div>

          {/* Grid of remaining projects */}
         <div className="grid gap-6 md:grid-cols-3">
  {portfolio.map((item, index) => (
    <motion.article
      key={item.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
    >
      {/* IMAGE */}
      <div className="relative h-40 md:h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
          {item.brand}
        </h3>

        <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-3 line-clamp-3">
          {item.title}
        </p>

        <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-4">
          {item.snippet}
        </p>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-1 font-medium text-gray-800 group-hover:text-black group-hover:gap-1.5 transition-all"
        >
          Visit website <span className="text-xs">↗</span>
        </a>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/90 via-transparent to-transparent" />
    </motion.article>
  ))}
</div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section
        aria-label="Portfolio final CTA"
        className="pb-16 md:pb-20 bg-gray-50"
      >
        <motion.div
          {...fadeUp(0)}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
            Seen enough?
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-3">
            Let&apos;s talk about your next launch.
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-6">
            Share what you&apos;re building, who it&apos;s for and what success
            looks like. We&apos;ll come back with a clear plan, rough timeline
            and recommended starting point.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
           
            <Button
              variant="ghost"
             onClick={() => router.push("/contact")}
            >
              Send project details
            </Button>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default PortfolioPage;
