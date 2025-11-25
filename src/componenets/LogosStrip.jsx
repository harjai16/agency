"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./ui/Section";

const LOGOS = [
  { name: "Northwind", src: "/images/logos/northwind.svg" },
  { name: "Lumen Retail", src: "/images/logos/lumen.svg" },
  { name: "Atlas Finance", src: "/images/logos/atlas.svg" },
  { name: "Vertex Labs", src: "/images/logos/vertex.svg" },
  { name: "Acme SaaS", src: "/images/logos/acme.svg" }
];

// duplicate for seamless loop
const LOOP_LOGOS = [...LOGOS, ...LOGOS];

const LogosStrip = () => {
  return (
    <Section
      aria-label="Client logos"
      className="py-10 md:py-12 bg-white"
    >
      <div className="border-y border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Text */}
          <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap mb-2 md:mb-0">
            Trusted by product, ops and growth teams at
          </div>

          {/* Marquee container */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="flex items-center gap-10 md:gap-14"
              // auto scroll effect
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear"
              }}
            >
              {LOOP_LOGOS.map((logo, idx) => (
                <div
                  key={logo.name + idx}
                  className="relative h-6 md:h-7 w-auto flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LogosStrip;
