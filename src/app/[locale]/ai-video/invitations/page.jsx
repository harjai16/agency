"use client";

import React from "react";
import { usePathname } from "next/navigation";
import aiVideoData from "@/data/ai-video.json";
import SeoSubpage from "@/componenets/ai-video/SeoSubpage";
import { getCurrentLocale } from "@/lib/navigation";

const data = aiVideoData.invitations;

export default function AiInvitationVideoPage() {
  const pathname = usePathname();
  const locale = getCurrentLocale(pathname);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swagatamtech.com";
  const pageUrl = `${siteUrl}/${locale}/ai-video/invitations`;
  const hubUrl = `${siteUrl}/${locale}/ai-video`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "AI Invitation Video Production",
    description:
      "AI-assisted invitation videos for weddings, celebrations, and launches—vertical and widescreen exports optimized for sharing.",
    provider: {
      "@type": "Organization",
      name: "Swagatam Tech",
      url: siteUrl,
      logo: `${siteUrl}/logo.jpeg`,
    },
    serviceType: ["Invitation Video", "Wedding Invitation Film", "Celebration Teaser"],
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
        name: "AI Invitation Videos",
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
      "AI-assisted invitation videos and digital experiences for milestone celebrations.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@swagatamtech.com",
    },
  };

  return (
    <SeoSubpage
      breadcrumbTitle="AI invitation videos"
      serviceSchema={serviceSchema}
      faqSchema={faqSchema}
      breadcrumbSchema={breadcrumbSchema}
      organizationSchema={organizationSchema}
      hero={data.hero}
      contentSections={data.contentSections}
      faq={data.faq}
      cta={data.cta}
      contentId="ai-invitation-video-content"
    />
  );
}
