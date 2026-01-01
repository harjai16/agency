"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import Button from "@/componenets/ui/Button";
import { useRouter } from "next/navigation";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const CTA = ({ data }) => {
  const router = useRouter();

  return (
    <Section
      aria-label="Consultancy CTA"
      className="py-16 md:py-20 bg-gray-50"
    >
      <motion.div
        {...fadeUp(0)}
        className="max-w-fullhd mx-auto text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
          {data.tag}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-3">
          {data.title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-4 sm:mb-6">
          {data.description}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => router.push("/contact")}>
            Schedule a consultation
          </Button>
          <Button
            variant="ghost"
            onClick={() => router.push("/services")}
          >
            View all services
          </Button>
        </div>
      </motion.div>
    </Section>
  );
};

export default CTA;

