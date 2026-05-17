"use client";

import React from "react";
import { usePathname } from "next/navigation";
import aiVideoData from "@/data/ai-video.json";
import StructuredData from "@/componenets/global/StructuredData";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";
import Hero from "@/componenets/bussines-consultancy/Hero";
import Services from "@/componenets/bussines-consultancy/Services";
import Benefits from "@/componenets/bussines-consultancy/Benefits";
import Process from "@/componenets/bussines-consultancy/Process";
import UseCases from "@/componenets/bussines-consultancy/UseCases";
import FAQ from "@/componenets/bussines-consultancy/FAQ";
import CTA from "@/componenets/bussines-consultancy/CTA";
import { getCurrentLocale } from "@/lib/navigation";

const hub = aiVideoData.hub;

export default function AiVideoHubPage() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swagatamtech.com";
  const hubUrl = `${siteUrl}/${locale}/ai-video`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AI Video Production Services",
    description:
      "AI-assisted video production for corporate storytelling, social campaigns, explainers, invitations, and celebration films—delivered with creative direction and multi-format exports.",
    provider: {
      "@type": "Organization",
      name: "Swagatam Tech",
      url: siteUrl,
      logo: `${siteUrl}/logo.jpeg`,
    },
    serviceType: hub.services.items.map((s) => s.title),
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Video Production",
      itemListElement: hub.services.items.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.tag,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Video Production",
        item: hubUrl,
      },
    ],
  };

  const formatsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI video formats and services",
    itemListElement: hub.services.items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        ...(service.href
          ? { url: `${siteUrl}/${locale}${service.href}` }
          : { url: `${hubUrl}#consultancy-services` }),
      },
    })),
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Swagatam Tech",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    description:
      "Website development and AI-assisted video production for brands, campaigns, and milestone celebrations.",
    sameAs: [
      "https://twitter.com/swagatamtech",
      "https://linkedin.com/company/swagatamtech",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@swagatamtech.com",
    },
  };

  return (
    <>
      <StructuredData data={serviceSchema} />
      <StructuredData data={formatsItemListSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />
      <main className="bg-white text-gray-900">
        <Hero data={hub.hero} />
        <Services data={hub.services} />
        <Benefits data={hub.benefits} />
        <Process data={hub.process} />
        <UseCases data={hub.useCases} />
        <FAQ data={hub.faq} />
        <CTA data={hub.cta} />
      </main>
      <SEOBacklinks />
    </>
  );
}
