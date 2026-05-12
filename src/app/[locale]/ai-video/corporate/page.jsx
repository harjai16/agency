"use client";

import React from "react";
import { usePathname } from "next/navigation";
import aiVideoData from "@/data/ai-video.json";
import SeoSubpage from "@/componenets/ai-video/SeoSubpage";
import { getCurrentLocale } from "@/lib/navigation";

const data = aiVideoData.corporate;

export default function CorporateAiVideoPage() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swagatamtech.com";
  const pageUrl = `${siteUrl}/${locale}/ai-video/corporate`;
  const hubUrl = `${siteUrl}/${locale}/ai-video`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Corporate AI Video Production",
    description:
      "Corporate AI-assisted brand films, employer branding, explainers, leadership updates, and product demos with multi-format exports.",
    provider: {
      "@type": "Organization",
      name: "Swagatam Tech",
      url: siteUrl,
      logo: `${siteUrl}/logo.jpeg`,
    },
    serviceType: ["Corporate AI Video", "Brand Film", "Product Explainer Video"],
    areaServed: "Worldwide",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.items.map((faq) => ({
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Corporate AI Video",
        item: pageUrl,
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Swagatam Tech",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    description:
      "Corporate AI video production and website development for growth teams.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@swagatamtech.com",
    },
  };

  return (
    <SeoSubpage
      breadcrumbTitle="Corporate AI video production"
      serviceSchema={serviceSchema}
      faqSchema={faqSchema}
      breadcrumbSchema={breadcrumbSchema}
      organizationSchema={organizationSchema}
      hero={data.hero}
      contentSections={data.contentSections}
      faq={data.faq}
      cta={data.cta}
      contentId="corporate-ai-video-content"
    />
  );
}
