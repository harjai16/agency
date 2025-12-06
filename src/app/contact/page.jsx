"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import ContactForm from "@/componenets/global/ContactForm";

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
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white text-center">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_70%)]" />

        <motion.div
          {...fadeUp(0)}
          className="max-w-fullhd mx-auto px-6 space-y-6"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Get in touch
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
            Let’s build something meaningful together.
          </h1>

          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tell us where you are today and where you want to go. Swagatam Tech helps brands turn modern, high-performance websites into real business results.
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
        className="pt-6 pb-20 md:pt-10 md:pb-24"
      >
        <div className="grid gap-10 md:gap-16 md:grid-cols-[1.1fr_minmax(0,1fr)] items-start max-w-6xl mx-auto">
          
          {/* Left: page copy */}
          <motion.div {...fadeUp(0)} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Contact Swagatam Tech
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[2.7rem] font-semibold tracking-tight text-gray-900">
              Let&apos;s plan your next website launch.
            </h2>

            <p className="text-sm md:text-base text-gray-500 max-w-xl leading-relaxed">
              Whether you're starting from scratch or leveling up an existing site, we help you plan, prioritize and ship the highest-impact version — fast.
            </p>

            <div className="space-y-2 text-xs md:text-sm text-gray-500">
              <p>
                You can also email us directly at{" "}
                <a
                  href="mailto:hello@swagatamtech.com"
                  className="underline underline-offset-4 decoration-gray-300 hover:decoration-gray-800"
                >
                  hello@swagatamtech.com
                </a>
                .
              </p>
              <p>
                We typically reply within{" "}
                <span className="font-medium text-gray-900">
                  one business day
                </span>
                .
              </p>
            </div>

            <div className="text-xs md:text-sm text-gray-400 pt-2">
              Already have a brief? 
              Paste the key notes in the form or share a link.
            </div>
          </motion.div>

          {/* Right: global contact form */}
          <ContactForm />
        </div>
      </Section>
    </main>
  );
};

export default ContactPage;
