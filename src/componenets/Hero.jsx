"use client";
import React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import Section from "./ui/Section";
import Image from "next/image";

// Animated stat counter for the card
const StatCounter = ({ value, suffix = "+" }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 40, // slower for smoother feel
    damping: 18,
  });

  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (latest <= value) {
        setDisplay(Math.round(latest));
      }
    });
    return unsubscribe;
  }, [springValue, value]);

  return (
    <div
      ref={ref}
      className="text-xl md:text-2xl font-semibold text-gray-900"
    >
      {display}
      {suffix}
    </div>
  );
};

// Logos for mini strip under the card
const HERO_LOGOS = [
  { name: "ProjectDeep", src: "/brands/projectdeep.svg" },
  { name: "SkillCrest", src: "/brands/skillcrest.png" },
  { name: "tipsy.webp", src: "/brands/tipsy.webp" },

 
];

// duplicate for seamless loop
const HERO_LOGOS_LOOP = [...HERO_LOGOS, ...HERO_LOGOS];

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
            Strategy, design and development for modern brands. Fast, responsive
            and SEO-driven websites that turn visitors into customers.
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

            <Button
              variant="ghost"
              onClick={() => router.push("/portfolio")}
            >
              View portfolio
            </Button>
          </motion.div>

          {/* Stats (static row under hero text) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="flex flex-wrap gap-6 pt-2 text-xs md:text-sm text-gray-500"
          >
            <div>
              <div className="font-semibold text-gray-900 text-base">
                120+
              </div>
              <div>Websites Delivered</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-base">
                98%
              </div>
              <div>Client success score</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-base">
                4–6 weeks
              </div>
              <div>Average timeline</div>
            </div>
          </motion.div>
        </div>

        {/* Right visual – stats card + logo strip */}
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
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  By the numbers
                </div>
                <div className="text-sm font-medium text-gray-900">
                  A quick look at our track record.
                </div>
              </div>
              <span className="text-[11px] rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-emerald-700">
                Updated live
              </span>
            </div>

            {/* Horizontal stats row */}
            <div className="flex items-center justify-between gap-4 md:gap-8">
              <div className="flex flex-col items-center flex-1">
                <StatCounter value={40} suffix="+" />
                <span className="text-[10px] md:text-[11px] text-gray-500 mt-1 whitespace-nowrap">
                  Happy Clients
                </span>
              </div>

              <div className="flex flex-col items-center flex-1">
                <StatCounter value={120} suffix="+" />
                <span className="text-[10px] md:text-[11px] text-gray-500 mt-1 whitespace-nowrap">
                  Projects Delivered
                </span>
              </div>

              <div className="flex flex-col items-center flex-1">
                <StatCounter value={8} suffix="+" />
                <span className="text-[10px] md:text-[11px] text-gray-500 mt-1 whitespace-nowrap">
                  Years Experience
                </span>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-gray-400">
              Based on completed projects, repeat clients and long-term
              partnerships across different industries.
            </p>
          </div>

          {/* Mini logo strip under the card */}
          <div className="mt-4 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm px-4 py-3">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
                Brands we&apos;ve worked with
              </span>
            </div>

            <div className="relative overflow-hidden">
              <motion.div
                className="flex items-center gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 22,
                  ease: "linear",
                }}
              >
                {HERO_LOGOS_LOOP.map((logo, idx) => (
                  <div
                    key={logo.name + idx}
                    className="relative h-9 w-24 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
