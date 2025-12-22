"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import ContactForm from "@/componenets/global/ContactForm";

const Contact = ({ pageName = "Home" }) => {
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
            Contact
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.4rem] font-semibold tracking-tight text-gray-900">
            Ready to launch a website
            <br className="hidden md:block" /> your brand is proud of?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-lg leading-relaxed">
            Tell us a bit about your business, what you&apos;re selling and what a
            &quot;win&quot; looks like for your new website. Swagatam Tech will come
            back within one business day with next steps — usually a short
            strategy call.
          </p>

          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-500">
            <p>
              Prefer email? Drop us a line at{" "}
              <a
                href="mailto:hello@swagatamtech.com"
                className="underline underline-offset-4 decoration-gray-300 hover:decoration-gray-800"
              >
                hello@swagatamtech.com
              </a>
              .
            </p>
            <p>
              Most website projects are designed, built and launched in{" "}
              <span className="font-medium text-gray-900">4–6 weeks</span>.
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
