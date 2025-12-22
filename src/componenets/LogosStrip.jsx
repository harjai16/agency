"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./ui/Section";

const LOGOS = [
  { name: "Northwind", src: "/images/casestudy/project-deep.webp" },
  { name: "Lumen Retail", src: "/images/casestudy/project-deep.webp" },
  { name: "Atlas Finance", src: "/images/casestudy/project-deep.webp" },
  { name: "Vertex Labs", src: "/images/casestudy/project-deep.webp" },
  { name: "Acme SaaS", src: "/images/casestudy/project-deep.webp" }
];

// duplicate for seamless loop
const LOOP_LOGOS = [...LOGOS, ...LOGOS];

const LogosStrip = () => {
  return (
    <Section
      aria-label="Client logos"
      className="py-2 sm:py-3 md:py-4 bg-white"
    >
                <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl whitespace-nowrap mb-2 md:mb-0 pb-2 mt-6 sm:mt-8 md:mt-10">
            Trusted by product, ops and growth teams at
          </div>
      <div className="border-y border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-5 md:py-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">

          {/* Text */}


          {/* Marquee */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              className="flex items-center gap-10 md:gap-14"
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
                  className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={140}      // fixed width
                    height={40}      // fixed height
                    className="object-contain"
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
