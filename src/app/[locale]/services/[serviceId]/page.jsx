"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useLocaleData } from "@/lib/use-locale-data";
import { getCurrentLocale, createLocalizedHref } from "@/lib/navigation";
import { useTranslations } from "@/lib/translations-context";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";
import Contact from "@/componenets/Contact";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const ServiceDetailPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getCurrentLocale(pathname);
  const t = useTranslations();
  const { data: pageData, loading: pageDataLoading } = useLocaleData('services-page');
  
  const rawServiceId = params?.serviceId;
  const serviceId = Array.isArray(rawServiceId) ? rawServiceId[0] : rawServiceId || "";

  const services = pageData?.services?.items || [];
  const service = services.find((s) => s.id === serviceId);

  // Map service IDs to SEO-friendly image names
  const serviceImageMap = {
    "strategy": "seo-optimization.jpg",
    "ux-ui": "ui-ux-design.jpg",
    "design": "ui-ux-design.jpg",
    "development": "content-writer.jpg",
    "cms": "social-media-management.jpg",
    "performance": "website-optimization.jpg",
    "support": "video-shoot-and-editing.jpg",
    "maintenance": "website-optimization.jpg"
  };

  if (pageDataLoading) {
    return (
      <main className="bg-white text-gray-900">
        <Section className="py-24 md:py-32">
          <div className="max-w-fullhd mx-auto text-center">
            <p className="text-sm md:text-base text-gray-500">Loading...</p>
          </div>
        </Section>
      </main>
    );
  }

  if (!service) {
    return (
      <main className="bg-white text-gray-900">
        <Section className="py-24 md:py-32">
          <div className="max-w-fullhd mx-auto text-center space-y-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Service not found
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              The service you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link href={createLocalizedHref("/services", currentLocale)}>
                Back to all services
              </Link>
            </Button>
          </div>
        </Section>
      </main>
    );
  }

  const serviceImage = serviceImageMap[service.id] || serviceImageMap[serviceId];
  const currentIndex = services.findIndex((s) => s.id === serviceId);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <main className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(209,213,219,0.35),_transparent_65%)]" />

        <Section className="pt-8 sm:pt-10 md:pt-16 pb-12 sm:pb-16 md:pb-20 relative z-[1]">
          <div className="max-w-fullhd mx-auto">
            {/* Breadcrumbs */}
            <motion.div {...fadeUp(0)} className="mb-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                <Link
                  href={createLocalizedHref("/services", currentLocale)}
                  className="hover:text-gray-900 transition-colors"
                >
                  {t?.navigation?.services || "Services"}
                </Link>
                <span className="h-[1px] w-6 bg-gray-300" />
                <span>{service.tag}</span>
              </div>
            </motion.div>

            <div className="grid gap-8 sm:gap-10 md:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
              {/* Left: Content */}
              <motion.div {...fadeUp(0)} className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {service.tag}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
                  {service.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl leading-relaxed">
                  {service.summary}
                </p>

                {/* Meta strip */}
                <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-gray-600">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {service.meta}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button onClick={() => router.push(createLocalizedHref("/contact", currentLocale))}>
                    {t?.services?.getStarted || "Get started"}
                  </Button>
                  <Button variant="ghost" onClick={() => router.push(createLocalizedHref("/services", currentLocale))}>
                    View all services
                  </Button>
                </div>
              </motion.div>

              {/* Right: Service Image */}
              {serviceImage && (
                <motion.div
                  {...fadeUp(0.1)}
                  className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-[0_22px_55px_rgba(15,23,42,0.12)] overflow-hidden"
                >
                  <div className="relative h-60 md:h-72 lg:h-80">
                    <Image
                      src={`/service/${serviceImage}`}
                      alt={service.title || "Service image"}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 40vw, 100vw"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </Section>
      </section>

      {/* DETAILED CONTENT */}
      <Section className="py-10 sm:py-12 md:py-14 lg:py-18 bg-white">
        <div className="max-w-fullhd mx-auto space-y-8">
          {/* Outcome */}
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
              What you'll get
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Expected Outcome
            </h2>
            <div className="rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-4 text-sm md:text-base text-gray-700">
              {service.outcome}
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div {...fadeUp(0.05)} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Service Category
              </p>
              <p className="text-base md:text-lg font-semibold text-gray-900">
                {service.tag}
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Best For
              </p>
              <p className="text-sm md:text-base text-gray-600">
                {service.meta}
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* PREV / NEXT NAVIGATION */}
      {prevService || nextService ? (
        <Section className="py-8 md:py-10 bg-white border-t border-gray-100">
          <div className="max-w-fullhd mx-auto flex flex-col md:flex-row items-stretch justify-between gap-4 text-sm">
            {prevService ? (
              <Link
                href={createLocalizedHref(`/services/${prevService.id}`, currentLocale)}
                className="group flex-1 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-100 transition-colors"
              >
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                    Previous service
                  </div>
                  <div className="font-medium text-gray-900 line-clamp-1">
                    {prevService.title}
                  </div>
                </div>
                <span className="text-xs text-gray-500 group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextService ? (
              <Link
                href={createLocalizedHref(`/services/${nextService.id}`, currentLocale)}
                className="group flex-1 rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-100 transition-colors"
              >
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-1">
                    Next service
                  </div>
                  <div className="font-medium text-gray-900 line-clamp-1">
                    {nextService.title}
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
      ) : null}

      {/* CONTACT SECTION */}
      <Contact pageName="Service Detail" />
      <SEOBacklinks />
    </main>
  );
};

export default ServiceDetailPage;
