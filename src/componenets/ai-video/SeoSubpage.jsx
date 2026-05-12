"use client";

import React from "react";
import StructuredData from "@/componenets/global/StructuredData";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";
import Hero from "@/componenets/bussines-consultancy/Hero";
import FAQ from "@/componenets/bussines-consultancy/FAQ";
import CTA from "@/componenets/bussines-consultancy/CTA";
import ContentSections from "@/componenets/ai-video/ContentSections";

/**
 * Focused AI video landing pages (corporate, invitations, etc.) with JSON-driven copy.
 */
export default function SeoSubpage({
  breadcrumbTitle,
  serviceSchema,
  faqSchema,
  breadcrumbSchema,
  organizationSchema,
  hero,
  contentSections,
  faq,
  cta,
  contentId = "ai-video-subpage",
}) {
  return (
    <>
      {serviceSchema ? <StructuredData data={serviceSchema} /> : null}
      {faqSchema ? <StructuredData data={faqSchema} /> : null}
      {breadcrumbSchema ? <StructuredData data={breadcrumbSchema} /> : null}
      {organizationSchema ? <StructuredData data={organizationSchema} /> : null}
      <main className="bg-white text-gray-900">
        <Hero data={hero} />
        <ContentSections
          sections={contentSections}
          id={contentId}
          ariaLabel={breadcrumbTitle}
        />
        <FAQ data={faq} />
        <CTA data={cta} />
      </main>
      <SEOBacklinks />
    </>
  );
}
