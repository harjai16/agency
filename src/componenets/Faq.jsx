"use client";
import React, { useState } from "react";
import FAQ from "@/componenets/ui/FAQ";
const servicesFAQ = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Most projects take 4–6 weeks depending on scope, revisions and content readiness. We also offer accelerated delivery for time-sensitive launches."
  },
  {
    question: "Do you handle everything or do we need separate designers/developers?",
    answer:
      "We are a full-stack team. We handle UX/UI design, development, responsiveness, hosting setup, SEO optimization, analytics and launch support."
  },
  {
    question: "Will my website be SEO optimized?",
    answer:
      "Yes. We follow SEO best practices including structured data, page speed optimization, responsive layout, metadata, sitemaps and on-page keyword strategy."
  },
  {
    question: "Can you redesign our existing website?",
    answer:
      "Absolutely. We improve UI, UX, performance, conversions, SEO and overall brand perception. We can migrate your current content too."
  },
  {
    question: "Do you build custom designs or use templates?",
    answer:
      "Everything we ship is custom built. No generic templates. Your website will be tailored to your brand, target audience and business goals."
  },
  {
    question: "Can we update the website ourselves after launch?",
    answer:
      "Yes — we build with modern CMS setups like WordPress, Headless CMS, or custom admin dashboards so your team can update text, images and blogs easily."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes. We offer affordable monthly maintenance including updates, performance monitoring, backups, bug fixes and monthly SEO improvements."
  },
  {
    question: "How much does a website project cost?",
    answer:
      "Pricing depends on complexity and features. Most small business websites fall between $1.5k–$8k. E-commerce or larger platforms priced separately. We provide clear fixed pricing before starting."
  }
];

const Faq = () => {



  return (
 <>
      {/* Sections */}
      <FAQ
        title="Services & Delivery"
        subtitle="Quick answers about what we offer"
        items={servicesFAQ}
      />
    </>
  );
};

export default Faq;
