"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import ContactForm from "@/componenets/global/ContactForm";
import { useTranslations } from "@/lib/translations-context";
    
const Contact = ({ pageName = "Home" }) => {
  const t = useTranslations();

  return (
    <Section
      id="contact"
      aria-label="Contact and inquiries"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white"
    >
      <div className="grid gap-6 sm:gap-8 md:gap-12 lg:gap-16 grid-cols-1 md:grid-cols-[1.1fr_minmax(0,1fr)] items-start">
        {/* Left: CTA copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-5 md:space-y-6"
        >
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-500">
            {t?.contact?.badge || "Contact"}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.4rem] font-semibold tracking-tight text-gray-900">
            {t?.contact?.title || "Let's build a website that works"}
            <br className="hidden md:block" /> {t?.contact?.titleLine2 || "for your business"}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-lg leading-relaxed">
            {t?.contact?.description || "Tell us about your product, goals, and what success looks like. We'll review it and get back within one business day with clear next steps."}
          </p>

          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
            <p>
              {t?.contact?.reachUs || "Reach us at"}{" "}
              <a
                href="mailto:contact@swagatamtech.com"
                className="underline underline-offset-4 decoration-gray-300 hover:decoration-gray-800"
              >
                contact@swagatamtech.com
              </a>
              .
            </p>
            <p>
              {t?.contact?.timeline || "Most website projects are designed, built and launched in"}{" "}
              <span className="font-medium text-gray-900">{t?.contact?.weeks || "4–6 weeks"}</span>.
            </p>
          </div>
        </motion.div>

        {/* Right: global contact form */}
        <ContactForm pageName={pageName} />
      </div>
    </Section>
  );
};

export default Contact;
