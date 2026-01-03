"use client";

import React from "react";
import consultancyData from "@/data/business-consultancy.json";
import StructuredData from "@/componenets/global/StructuredData";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";
import Hero from "@/componenets/bussines-consultancy/Hero";
import Services from "@/componenets/bussines-consultancy/Services";
import Benefits from "@/componenets/bussines-consultancy/Benefits";
import Process from "@/componenets/bussines-consultancy/Process";
import UseCases from "@/componenets/bussines-consultancy/UseCases";
import FAQ from "@/componenets/bussines-consultancy/FAQ";
import CTA from "@/componenets/bussines-consultancy/CTA";

const BusinessConsultancyPage = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swagatamtech.com';

  // Service Schema for Business Consulting
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Business Consulting Services",
    "description": "Expert business consulting services including digital strategy, market research, business model optimization, growth consulting, process improvement, and technology consulting.",
    "provider": {
      "@type": "Organization",
      "name": "Swagatam Tech",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.jpeg`
    },
    "serviceType": [
      "Business Consulting",
      "Strategic Consulting",
      "Digital Strategy Consulting",
      "Market Research",
      "Business Model Optimization",
      "Growth Consulting",
      "Process Improvement",
      "Technology Consulting"
    ],
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Business Consulting Services",
      "itemListElement": consultancyData.services.items.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.summary,
          "serviceType": service.tag
        }
      }))
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": consultancyData.faq.items.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Business Consulting",
        "item": `${siteUrl}/bussines-consultancy`
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Swagatam Tech",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.jpeg`,
    "description": "Business consulting and website development agency providing strategic guidance and digital solutions.",
    "sameAs": [
      "https://twitter.com/swagatamtech",
      "https://linkedin.com/company/swagatamtech"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "ashwaniharjai.softwaredev@gmail.com"
    }
  };

  return (
    <>
      <StructuredData data={serviceSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={organizationSchema} />
      <main className="bg-white text-gray-900">
        <Hero data={consultancyData.hero} />
        <Services data={consultancyData.services} />
        <Benefits data={consultancyData.benefits} />
        <Process data={consultancyData.process} />
        <UseCases data={consultancyData.useCases} />
        <FAQ data={consultancyData.faq} />
        <CTA data={consultancyData.cta} />
      </main>
      <SEOBacklinks />
    </>
  );
};

export default BusinessConsultancyPage;
