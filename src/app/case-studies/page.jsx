"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import caseStudies from "@/data/case-studies.json";
import { useRouter } from "next/navigation";
import StructuredData from "@/componenets/global/StructuredData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const CaseStudiesPage = () => {
    const router = useRouter();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

    const collectionSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Case Studies - Swagatam Tech",
      "description": "A closer look at websites we've designed and built — focused on speed, stability, and usability. Real projects, not concepts.",
      "url": `${siteUrl}/case-studies`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": caseStudies.length,
        "itemListElement": caseStudies.slice(0, 10).map((caseStudy, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "CaseStudy",
            "name": caseStudy.heroTitle || caseStudy.title,
            "description": caseStudy.snippet,
            "url": `${siteUrl}${caseStudy.href || `/case-studies/${caseStudy.id}`}`,
            "image": caseStudy.image ? (caseStudy.image.startsWith('http') ? caseStudy.image : `${siteUrl}${caseStudy.image}`) : undefined,
            "about": {
              "@type": "Thing",
              "name": caseStudy.industry
            },
            "client": {
              "@type": "Organization",
              "name": caseStudy.client
            }
          }
        }))
      }
    };

  return (
    <main className="bg-white text-gray-900">
      <StructuredData data={collectionSchema} />
      {/* Banner / Hero */}
      <Section
        id="case-studies-hero"
        aria-label="Case studies hero"
        className="pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 md:pb-14"
      >
        <div className="max-w-fullhd mx-auto space-y-4 sm:space-y-6 text-left">
          <motion.div {...fadeUp(0)} className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Case studies
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
             Real projects. {" "}
              <span className="inline-block border-b border-gray-300 pb-1">
               
              </span>{" "}
            Real outcomes.
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed max-w-3xl">
             A closer look at websites we’ve designed and built — focused on speed, stability, and usability.
From faster load times to smoother flows and clearer content, these are shipped projects, not concepts. No hypotheticals. Just real work.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.05)}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              onClick={() => router.push("/portfolio")}
            >
              Discuss your project       
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document
                  .getElementById("case-studies-list")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Browse case studies
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Listing grid */}
      <Section
        id="case-studies-list"
        aria-label="Case studies list"
        className="pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white"
      >
        <div className="max-w-fullhd mx-auto space-y-4 sm:space-y-6">
          {/* Optional small label row */}
          <div className="flex items-center justify-between gap-4 text-xs md:text-sm text-gray-500">
            <span>{caseStudies.length} projects</span>
            <span className="hidden md:inline-block">
              From SaaS and fintech to e-commerce and modern brands.
            </span>
          </div>

          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((item, index) => (
              <motion.article
                key={item.id + index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
              >
                <Link href={item.href} className="flex flex-col h-full">
                  {/* Top image area */}
                  <div className="relative w-full h-40 md:h-44 overflow-hidden bg-gray-50">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        fill
                        priority={index === 0}
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    )}

                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                    {/* image text */}
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
                  <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4">
                    <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-4">
                      {item.snippet}
                    </p>

                    <div className="mt-auto flex items-center justify-between text-[11px] text-gray-500">
                      <span>{item.meta}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-gray-800 group-hover:text-black group-hover:gap-1.5 transition-all">
                        Read case study
                        <span className="text-xs">↗</span>
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/90 via-transparent to-transparent" />
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

<Section
        aria-label="Portfolio final CTA"
        className="pb-12 sm:pb-16 md:pb-20 bg-gray-50"
      >
        <motion.div
          {...fadeUp(0)}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
           Seen something relevant?
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
           Let’s talk about your use case
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
           If one of these projects feels close to what you’re building, let’s discuss it.
Share a bit about your goals and constraints, and we’ll suggest a clear approach and realistic next steps.
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

export default CaseStudiesPage;
