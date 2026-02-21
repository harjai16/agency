"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Section from "./ui/Section";
import Button from "./ui/Button";
import { useLocaleData } from "@/lib/use-locale-data";
import { useTranslations } from "@/lib/translations-context";
import { createLocalizedHref, getCurrentLocale } from "@/lib/navigation";
import { usePathname } from "next/navigation";

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      delay: i * 0.2,
      ease: [0.22, 1, 0.36, 1]
    },
  }),
};

const imageVariants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.8, 
      delay: i * 0.2 + 0.1,
      ease: [0.22, 1, 0.36, 1]
    },
  }),
};

// Map home/legacy service IDs to detail page IDs (so card clicks open the right page)
const SERVICE_ID_TO_DETAIL = {
  design: "ux-ui",
  maintenance: "support",
};

const Services = () => {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const t = useTranslations();
  const { data: pageData, loading } = useLocaleData('services-page');
  const servicesList = pageData?.services?.items || [];

  // Map service IDs to SEO-friendly image names (covers both services.json and services-page IDs)
  const serviceImageMap = {
    strategy: "seo-optimization.jpg",
    design: "ui-ux-design.jpg",
    "ux-ui": "ui-ux-design.jpg",
    development: "content-writer.jpg",
    cms: "social-media-management.jpg",
    performance: "website-optimization.jpg",
    support: "video-shoot-and-editing.jpg",
    maintenance: "website-optimization.jpg",
  };

  // Link href: use detail-page ID so every card opens a valid service page
  const getServiceHref = (service) => {
    const detailId = SERVICE_ID_TO_DETAIL[service.id] || service.id;
    return createLocalizedHref(`/services/${detailId}`, currentLocale);
  };

  return (
    <Section
      id="services"
      aria-label="Services we offer"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
        <div className="space-y-2 sm:space-y-3 max-w-7xl">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500">
            {t?.services?.badge || "Services"}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            {t?.services?.title || "Website Development Services Built for Fast Performance and Business Growth"}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-6xl">
            {t?.services?.description ? (
              <>
                {t.services.description.split(/(\{website\}|\{portfolio\}|\{caseStudies\})/).map((part, idx) => {
                  if (part === '{website}') {
                    return <Link key={idx} href={createLocalizedHref("/services", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">{t.services.website || "website"}</Link>;
                  } else if (part === '{portfolio}') {
                    return <Link key={idx} href={createLocalizedHref("/portfolio", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">{t.services.portfolio || "portfolio"}</Link>;
                  } else if (part === '{caseStudies}') {
                    return <Link key={idx} href={createLocalizedHref("/case-studies", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">{t.services.caseStudies || "case studies"}</Link>;
                  }
                  return <span key={idx}>{part}</span>;
                })}
              </>
            ) : (
              <>
                From concept to a fully launched <Link href={createLocalizedHref("/services", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">website</Link>, we partner with you at every stage. Explore our <Link href={createLocalizedHref("/portfolio", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">portfolio</Link> to see completed projects, or check our <Link href={createLocalizedHref("/case-studies", currentLocale)} className="text-gray-600 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">case studies</Link> for detailed results.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Services Grid with hover tooltips */}
      {loading && servicesList.length === 0 ? (
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
          {/* Loading skeleton */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
          {servicesList.map((service, index) => {
            const imageKey = SERVICE_ID_TO_DETAIL[service.id] || service.id;
            const hasImage = serviceImageMap[imageKey] || serviceImageMap[service.id];
            return (
          <Link
            key={service.id}
            href={getServiceHref(service)}
            className="block"
          >
            <motion.article
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-sm p-0 shadow-[0_18px_40px_rgba(15,23,42,0.04)] cursor-pointer"
            >
            {/* Service Image */}
            {hasImage && (
              <motion.div 
                className="relative w-full h-64 sm:h-72 md:h-80 z-0"
                custom={index}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                variants={imageVariants}
              >
                <Image
                  src={`/service/${serviceImageMap[imageKey] || serviceImageMap[service.id]}`}
                  alt={service.title || service.label || "Service image"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            )}

            {/* Title only - always visible at bottom of image */}
            {hasImage && (
            <div
              className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 md:p-6 flex flex-col justify-end pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)",
              }}
            >
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                {service.title || service.label}
              </h3>
            </div>
            )}
            {/* Full details - visible on hover only */}
            {hasImage && (
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 md:p-6 flex flex-col justify-end pointer-events-none">
              <div className="max-w-full">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70">
                    {service.tag}
                  </span>
                  <span className="text-[9px] sm:text-[10px] rounded-full border border-white/30 px-2 py-0.5 text-white/80">
                    {service.meta}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">
                  {service.title || service.label}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mb-2 leading-relaxed line-clamp-2">
                  {service.summary || service.description}
                </p>
                <div className="text-[10px] sm:text-xs text-white/80">
                  <span className="font-medium text-white">
                    {t?.services?.outcome || "Outcome:"}
                  </span>{" "}
                  <span className="line-clamp-1">{service.outcome}</span>
                </div>
              </div>
            </div>
            )}
            </motion.article>
          </Link>
          );
          })}
        </div>
      )}
    </Section>
  );
};

export default Services;
