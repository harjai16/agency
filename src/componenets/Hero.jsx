"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import Section from "./ui/Section";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter();
  return (
    <Section
      id="hero"
      aria-label="Website development agency hero section"
      className="pt-10 pb-10 md:pt-10 md:pb-20 bg-white"
    >
      <div className="grid gap-12 md:grid-cols-2 items-center">
        {/* Left side: Text content */}
        <div className="space-y-7">
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-600 bg-white/70 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            BUILDING BRANDS ONLINE
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl md:text-5xl lg:text-[3.1rem] font-semibold tracking-tight text-gray-900"
          >
            We craft high-performance{" "}
            <span className="inline-block border-b border-gray-300 pb-1">
              websites
            </span>{" "}
            that grow your business.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-sm md:text-base text-gray-500 max-w-3xl leading-relaxed"
          >
            Strategy, design and development for modern brands.  
            Fast, responsive and SEO-driven websites that turn visitors into customers.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
    onClick={() =>
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Schedule a call
  </Button>
          
            <Button variant="ghost" onClick={() => router.push("/portfolio")}>
  View portfolio
</Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500"
          >
            <div>
              <div className="font-semibold text-gray-900 text-base">120+</div>
              <div>Websites Delivered</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-base">98%</div>
              <div>Client success score</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-base">4–6 weeks</div>
              <div>Average timeline</div>
            </div>
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Soft gradient blob */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-2xl" />

          {/* Main card */}
          <div className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Live performance
                </div>
                <div className="text-sm font-medium text-gray-900">
                  SEO health score
                </div>
              </div>
              <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
                92/100
              </span>
            </div>

            {/* Simple graph */}
            <div className="grid grid-cols-4 gap-2 h-24 items-end mb-6">
              <div className="rounded-full bg-gray-100" style={{ height: "40%" }} />
              <div className="rounded-full bg-gray-100" style={{ height: "60%" }} />
              <div className="rounded-full bg-gray-200" style={{ height: "80%" }} />
              <div className="rounded-full bg-black" style={{ height: "100%" }} />
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <div>
                <div className="font-medium text-gray-900 text-sm">
                  Performance-first design
                </div>
                <div>Improves conversion & visibility</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900 text-sm">
                  +38%
                </div>
                <div>Avg conversion increase</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
