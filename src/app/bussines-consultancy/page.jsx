"use client";

import React from "react";
import consultancyData from "@/data/business-consultancy.json";
import StructuredData from "@/componenets/global/StructuredData";
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
      "logo": `${siteUrl}/logo.png`
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
    "logo": `${siteUrl}/logo.png`,
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
      {/* Hidden backlinks for SEO */}
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
        <a href="/">Website Agency</a>
        <a href="/about">Web Development Agency</a>
        <a href="/services">Digital Marketing Agency</a>
        <a href="/portfolio">Website Design Agency</a>
        <a href="/case-studies">Web Design Services</a>
        <a href="/blogs">Website Development Services</a>
        <a href="/contact">Business Consultancy Services</a>
        <a href="/careers">Digital Agency Careers</a>
        <a href="/services">Custom Website Development</a>
        <a href="/portfolio">Website Design Company</a>
        <a href="/case-studies">Web Development Company</a>
        <a href="/blogs">Digital Marketing Services</a>
        <a href="/contact">Website Agency Contact</a>
        <a href="/about">Professional Web Agency</a>
        <a href="/services">Website Development Agency India</a>
        <a href="/portfolio">Best Web Development Agency</a>
      </div>
    </>
  );
};

export default BusinessConsultancyPage;
