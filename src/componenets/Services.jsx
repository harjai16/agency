"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Section from "./ui/Section";
import Button from "./ui/Button";
import { useLocaleData } from "@/lib/use-locale-data";
import { useTranslations } from "@/lib/translations-context";
import { createLocalizedHref, getCurrentLocale } from "@/lib/navigation";
import { usePathname } from "next/navigation";

const cardVariants = {
  initial: { opacity: 0, y: 18 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

const Services = () => {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const t = useTranslations();
  const { data: services, loading } = useLocaleData('services');
  
  // Ensure services is always an array
  const servicesList = Array.isArray(services) ? services : [];

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

      {/* Services Grid */}
      {loading && servicesList.length === 0 ? (
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
          {/* Loading skeleton */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
          {servicesList.map((service, index) => (
          <motion.article
            key={service.id}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-gray-500">
                {service.tag}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] rounded-full border border-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 text-gray-600 group-hover:border-gray-900 group-hover:text-gray-900 transition-colors">
                {service.meta}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2">
              {service.label}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 leading-relaxed">
              {service.description}
            </p>

            {/* Outcome */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
              <p className="max-w-[70%]">
                <span className="font-medium text-gray-900">
                  {t?.services?.outcome || "Outcome:"}
                </span>{" "}
                {service.outcome}
              </p>
             
            </div>

            {/* Subtle hover overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-50/80 via-transparent to-transparent" />
          </motion.article>
          ))}
        </div>
      )}
    </Section>
  );
};

export default Services;
