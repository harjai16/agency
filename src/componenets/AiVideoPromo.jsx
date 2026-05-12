"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import { usePathname } from "next/navigation";
import { createLocalizedHref, getCurrentLocale } from "@/lib/navigation";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, delay },
});

/** Curated Unsplash stills (allowed in next.config remotePatterns) — corporate / celebration tones */
const tiles = [
  {
    title: "Company & brand",
    body: "Launch films, employer branding, explainers, and product stories built for clarity and conversion.",
    href: "/ai-video/corporate",
    imageSrc:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Team collaborating on video strategy in a modern office",
  },
  {
    title: "Invitations & events",
    body: "Wedding invites, save-the-dates, launch teasers, and celebration announcements with a cinematic feel.",
    href: "/ai-video/invitations",
    imageSrc:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Wedding rings and flowers — invitation and celebration video mood",
  },
];

const heroVisual = {
  src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80",
  alt: "Video editing workspace with timeline and creative tools",
};

export default function AiVideoPromo() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const hub = createLocalizedHref("/ai-video", locale);

  return (
    <Section
      id="ai-video-promo"
      aria-label="AI video production"
      className="py-14 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-fullhd mx-auto grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
        <motion.div {...fadeUp(0)} className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            AI video production
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            AI-powered video for{" "}
            <span className="border-b border-gray-300 pb-0.5">companies & invitations</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
            We produce AI-assisted videos across formats—corporate storytelling, social ads, explainers,
            wedding and event invitations, and campaign-ready cuts—structured for brand consistency,
            faster turnaround, and SEO-friendly landing pages when you publish them online.
          </p>

          <motion.div
            {...fadeUp(0.04)}
            className="relative mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-gray-900/5 shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
              <Image
                src={heroVisual.src}
                alt={heroVisual.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/75 via-gray-900/25 to-violet-900/15"
                aria-hidden
              />
              <div className="pointer-events-none absolute left-3 top-3 sm:left-4 sm:top-4">
                <span className="inline-flex items-center rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-gray-800 shadow-sm backdrop-blur">
                  AI-assisted workflow
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 sm:p-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gray-900 shadow-md ring-1 ring-white/40"
                  aria-hidden
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </span>
                <p className="text-xs sm:text-sm font-medium leading-snug text-white drop-shadow-sm">
                  Human-led creative direction — AI speeds edits, variants, and captions.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild eventLabel="Explore AI video hub">
              <Link href={hub}>Explore AI video services</Link>
            </Button>
            <Button variant="ghost" asChild eventLabel="Corporate AI video">
              <Link href={createLocalizedHref("/ai-video/corporate", locale)}>
                Corporate AI video
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.08)}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 lg:max-w-none"
        >
          {tiles.map((tile) => (
            <Link
              key={tile.href}
              href={createLocalizedHref(tile.href, locale)}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:border-gray-200 hover:shadow-[0_22px_48px_rgba(15,23,42,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
                <Image
                  src={tile.imageSrc}
                  alt={tile.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 100vw, 380px"
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                  aria-hidden
                />
                <span className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white drop-shadow-md">
                  {tile.title}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{tile.body}</p>
                <span className="mt-4 inline-flex text-[11px] font-medium text-gray-900 group-hover:underline">
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
