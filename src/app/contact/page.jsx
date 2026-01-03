"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import ContactForm from "@/componenets/global/ContactForm";
import SEOBacklinks from "@/componenets/global/SEOBacklinks";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const ContactPage = () => {
  return (
    <main className="bg-white text-gray-900">

      {/* 🔥 BANNER / HERO */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white text-center">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_70%)]" />

        <motion.div
          {...fadeUp(0)}
          className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-4 sm:space-y-6"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Get in touch
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
           Website Development Agency{" "}
           <span className="inline-block border-b border-gray-300 pb-1">
             Fast Performance Websites Built for Business
           </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Let's talk about what you're building. Tell us where you are today and what you're trying to achieve. At Swagatam Tech, we help teams plan and build modern, high-performance <Link href="/services" className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">websites</Link> with clear goals and realistic timelines. Explore our <Link href="/portfolio" className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">portfolio</Link> and <Link href="/case-studies" className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">case studies</Link> to see our <Link href="/services" className="text-gray-700 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-500 transition-colors">web development</Link> work. Get a free website plan today.
          </p>

          <Button
            onClick={() =>
              document.getElementById("contact-page-hero")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="mt-2"
          >
            Talk to the team
          </Button>
        </motion.div>
      </section>

      {/* 📩 CONTACT BODY */}
      <Section
        id="contact-page-hero"
        aria-label="Contact Swagatam Tech"
        className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20 lg:pb-24"
      >
        <div className="grid gap-8 sm:gap-10 md:gap-16 md:grid-cols-1 lg:grid-cols-[1.1fr_minmax(0,1fr)] items-start max-w-6xl mx-auto">
          
          {/* Left: page copy */}
          <motion.div {...fadeUp(0)} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
             Planning a new website or an improvement?
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.7rem] font-semibold tracking-tight text-gray-900">
           Website Development Services Built for Fast Performance
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-xl leading-relaxed">
             Whether you’re starting from scratch or improving an existing site, we’ll help you prioritize what matters most and outline a clear path forward.
            </p>

            <div className="space-y-2 text-xs md:text-sm text-gray-500">
              <p>
                You can also email us directly at{" "}
                <a
                  href="mailto:ashwaniharjai.softwaredev@gmail.com"
                  className="underline underline-offset-4 decoration-gray-300 hover:decoration-gray-800"
                >
                  ashwaniharjai.softwaredev@gmail.com
                </a>
                .
              </p>
              <p>
               We usually respond within{" "}
                <span className="font-medium text-gray-900">
                  one business day.
                </span>
                .
              </p>
            </div>

            <div className="text-xs md:text-sm text-gray-400 pt-2">
              Already have a brief? 
           Paste the key details in the form or share a document or link — whatever’s easiest.
            </div>
          </motion.div>

          {/* Right: global contact form */}
          <ContactForm pageName="Contact" />
        </div>
      </Section>
      <SEOBacklinks />
    </main>
  );
};

export default ContactPage;
