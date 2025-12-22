"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import caseStudies from "@/data/case-studies.json";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const CaseStudyPage = () => {
const params = useParams();
const rawSlug = params?.slug;

// Normalize slug (because on dynamic catch routes slug could be array)
const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";

// Find case study
const currentIndex = caseStudies.findIndex((cs) => cs.id === slug);

// Return null if not found
const caseStudy = currentIndex >= 0 ? caseStudies[currentIndex] : null
  if (!caseStudy) {
    return (
      <main className="bg-white text-gray-900">
        <Section className="py-24 md:py-32">
          <div className="max-w-fullhd mx-auto text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Case study not found
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              The project you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/case-studies">Back to all case studies</Link>
            </Button>
          </div>
        </Section>
      </main>
    );
  }

  const {
    client,
    industry,
    title,
    heroTitle,
    snippet,
    metric,
    meta,
    liveUrl,
    challenge,
    solution,
    impact,
    services,
    deliverables,
    testimonial,
    images,
    image,
    imageAlt,
  } = caseStudy;

  const heroImage = images?.[0] || image;
  const prevCase = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCase =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  return (
    <main className="bg-white text-gray-900">
      {/* HERO / BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(209,213,219,0.35),_transparent_65%)]" />

        <Section className="pt-8 sm:pt-10 md:pt-16 pb-12 sm:pb-16 md:pb-20 relative z-[1]">
          <div className="max-w-fullhd mx-auto grid gap-8 sm:gap-10 md:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            {/* Left: copy */}
            <motion.div {...fadeUp(0)} className="space-y-6">
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                <Link
                  href="/case-studies"
                  className="hover:text-gray-900 transition-colors"
                >
                  Case studies
                </Link>
                <span className="h-[1px] w-6 bg-gray-300" />
                <span>{client}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
                {heroTitle || title}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl leading-relaxed">
                {snippet}
              </p>

              {/* Meta strip */}
              <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-gray-600">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {industry}
                </div>
                {metric && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700">
                    Key result: {metric}
                  </div>
                )}
                {meta && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1">
                    {meta}
                  </div>
                )}
              </div>

              {/* Live link + CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {liveUrl && (
                  <Button asChild>
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live website ↗
                    </a>
                  </Button>
                )}
                <Button variant="ghost" asChild>
                  <Link href="/contact">Discuss a similar project</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right: hero image */}
            {heroImage && (
              <motion.div
                {...fadeUp(0.1)}
                className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_22px_55px_rgba(15,23,42,0.12)] overflow-hidden"
              >
                <div className="relative h-60 md:h-72 lg:h-80">
                  <Image
                    src={heroImage}
                    alt={imageAlt || title}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 40vw, 100vw"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </Section>
      </section>

      {/* CHALLENGE / SOLUTION / IMPACT */}
      <Section className="py-10 sm:py-12 md:py-14 lg:py-18 bg-white">
        <div className="max-w-fullhd mx-auto grid gap-8 sm:gap-10 md:grid-cols-1 lg:grid-cols-3 md:items-start">
          <motion.div {...fadeUp(0)} className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Challenge
            </p>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
              Where things were breaking.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              {challenge}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.05)} className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Solution
            </p>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              What we designed and built.
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {solution}
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Impact
            </p>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              What changed after launch.
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {impact}
            </p>

            {metric && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs md:text-sm text-gray-800">
                <span className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
                  Headline result
                </span>
                <span className="font-semibold">{metric}</span>
              </div>
            )}
          </motion.div>
        </div>
      </Section>

      {/* SERVICES / DELIVERABLES + GALLERY */}
      <Section className="py-10 sm:py-12 md:py-14 lg:py-20 bg-gray-50">
        <div className="max-w-fullhd mx-auto grid gap-8 sm:gap-10 md:grid-cols-1 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] items-start">
          {/* Left: gallery */}
          <motion.div {...fadeUp(0)} className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">
              Screens & flows
            </p>
            <div className="space-y-4">
              {(images && images.length > 0 ? images : [heroImage]).map(
                (imgSrc, index) => (
                  <div
                    key={imgSrc + index}
                    className="relative w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
                  >
                    <div className="relative h-56 md:h-64 lg:h-72">
                      <Image
                        src={imgSrc}
                        alt={`${client} screen ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width:1024px) 50vw, 100vw"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>

          {/* Right: services & deliverables */}
          <motion.div {...fadeUp(0.05)} className="space-y-8">
            {/* Services */}
            {services && services.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Services
                </p>
                <ul className="space-y-2 text-sm md:text-base text-gray-600">
                  {services.map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gray-900" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Deliverables */}
            {deliverables && deliverables.length > 0 && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Deliverables
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-gray-700">
                  {deliverables.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur px-3 py-2.5 shadow-[0_10px_25px_rgba(15,23,42,0.04)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick project meta mini card */}
            <div className="rounded-2xl border border-gray-100 bg-white/80 backdrop-blur px-4 py-3 text-xs md:text-sm text-gray-600 shadow-[0_10px_25px_rgba(15,23,42,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                    Client
                  </p>
                  <p className="font-medium text-gray-900">{client}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                    Industry
                  </p>
                  <p>{industry}</p>
                </div>
                {meta && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      Timeline
                    </p>
                    <p>{meta}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* TESTIMONIAL (optional) */}
      {testimonial && testimonial.quote && (
        <Section className="py-14 md:py-18 bg-white">
          <motion.div {...fadeUp(0)} className="max-w-fullhd mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              Client perspective
            </p>
            <blockquote className="text-sm md:text-base text-gray-900 leading-relaxed italic">
              “{testimonial.quote}”
            </blockquote>
            {testimonial.name && (
              <p className="mt-3 text-xs md:text-sm text-gray-500">
                {testimonial.name}
              </p>
            )}
          </motion.div>
        </Section>
      )}

      {/* PREV / NEXT NAVIGATION */}
      <Section className="py-8 md:py-10 bg-white border-t border-gray-100">
        <div className="max-w-fullhd mx-auto flex flex-col md:flex-row items-stretch justify-between gap-4 text-sm">
          {prevCase ? (
            <Link
              href={prevCase.href}
              className="group flex-1 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-100 transition-colors"
            >
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                  Previous case study
                </div>
                <div className="font-medium text-gray-900 line-clamp-1">
                  {prevCase.title}
                </div>
              </div>
              <span className="text-xs text-gray-500 group-hover:-translate-x-1 transition-transform">
                ←
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextCase ? (
            <Link
              href={nextCase.href}
              className="group flex-1 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-100 transition-colors"
            >
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                  Next case study
                </div>
                <div className="font-medium text-gray-900 line-clamp-1">
                  {nextCase.title}
                </div>
              </div>
              <span className="text-xs text-gray-500 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <motion.div {...fadeUp(0)} className="max-w-fullhd mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
            Plan your own project
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
            Want results like this for your brand?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
            Share what you&apos;re working on, and we&apos;ll map out how Swagatam
            Tech would approach a similar build — from structure and design to
            launch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/contact">Talk to the team</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/case-studies">Browse more case studies</Link>
            </Button>
          </div>
        </motion.div>
      </Section>
    </main>
  );
};

export default CaseStudyPage;
