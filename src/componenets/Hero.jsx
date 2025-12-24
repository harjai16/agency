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
      className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900"
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
    { name: "ads_enviro", src: "/brands/ads_enviro.png" },
      { name: "tipsy.webp", src: "/brands/Logo-Nut-Square-Final.png" },
        { name: "tipsy.webp", src: "/brands/recy-logo.webp" },
  

 
];

// duplicate for seamless loop
const HERO_LOGOS_LOOP = [...HERO_LOGOS, ...HERO_LOGOS];

const Hero = () => {
  const router = useRouter();

  return (
    <Section
      id="hero"
      aria-label="Website development agency hero section"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white"
    >
      <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-14 grid-cols-1 md:grid-cols-2 items-start md:items-center">
        {/* Left side: Text content */}
        <div className="space-y-5 sm:space-y-6 md:space-y-7 order-1 md:order-1">
          {/* Top pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gray-200 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-gray-600 bg-white/70 backdrop-blur"
          >
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-emerald-500" />
            BUILDING BRANDS ONLINE Ashwani
          </motion.div>

          {/* Heading */}
          <motion.h1    
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.1rem] font-semibold tracking-tight text-gray-900 leading-[1.2] sm:leading-tight md:leading-tight"
          >
            We craft high-performance{" "}
            <span className="inline-block border-b-2 border-gray-300 pb-1 sm:pb-1.5">
              websites
            </span>{" "}
            that grow your business.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-sm sm:text-base md:text-lg text-gray-500 max-w-3xl leading-relaxed"
          >
           Strategy, UX, and development focused on leads, conversions, and measurable growth — not vanity design.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3"
          >
            <Button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="w-full sm:w-auto"
            >
              Get a free conversion audit
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.push("/portfolio")}
              className="w-full sm:w-auto"
            >
              View portfolio
            </Button>
          </motion.div>

          {/* Stats (static row under hero text) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-5 md:pt-6 text-xs sm:text-sm md:text-base text-gray-500"
          >
            <div className="text-center sm:text-left">
              <div className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1">
                10+
              </div>
              <div className="text-[10px] sm:text-xs leading-tight">Websites Delivered</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1">
                98%
              </div>
              <div className="text-[10px] sm:text-xs leading-tight">Client success score</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-semibold text-gray-900 text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1">
                4–6 weeks
              </div>
              <div className="text-[10px] sm:text-xs leading-tight">Average timeline</div>
            </div>
          </motion.div>
        </div>

        {/* Right visual – stats card + logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-2 md:order-2 w-full"
        >
          {/* Soft gradient blob */}
          <div className="pointer-events-none absolute -top-6 -right-6 sm:-top-8 sm:-right-8 md:-top-10 md:-right-10 h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-tr from-gray-100 via-gray-50 to-white blur-2xl opacity-50 sm:opacity-100" />

          {/* Main card */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/90 sm:bg-white/80 backdrop-blur p-4 sm:p-5 md:p-6 lg:p-7 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-5 md:mb-6">
              <div className="flex-1 min-w-0">
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.16em] text-gray-500">
                  By the numbers
                </div>
                <div className="text-sm sm:text-base md:text-lg font-medium text-gray-900 mt-1">
                  A quick look at our track record.
                </div>
              </div>
              <span className="text-[10px] sm:text-xs rounded-full border border-emerald-100 bg-emerald-50 px-2 sm:px-2.5 py-1 sm:py-1.5 text-emerald-700 self-start sm:self-auto whitespace-nowrap">
                Updated live
              </span>
            </div>

            {/* Horizontal stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              <div className="flex flex-col items-center">
                <StatCounter value={10} suffix="+" />
                <span className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 text-center leading-tight">
                  Happy Clients
                </span>
              </div>

              <div className="flex flex-col items-center">
                <StatCounter value={10} suffix="+" />
                <span className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 text-center leading-tight">
                  Projects Delivered
                </span>
              </div>

              <div className="flex flex-col items-center">
                <StatCounter value={6} suffix="+" />
                <span className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2 text-center leading-tight">
                  Years Experience
                </span>
              </div>
            </div>

            <p className="mt-4 sm:mt-5 text-[10px] sm:text-xs text-gray-400 leading-relaxed">
              Based on completed projects, repeat clients and long-term
              partnerships across different industries.
            </p>
          </div>

          {/* Mini logo strip under the card */}
          <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-gray-100 bg-white/90 sm:bg-white/80 backdrop-blur-sm px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4">
            <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-2.5">
              <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.18em] text-gray-500 font-medium">
                Brands we&apos;ve worked with
              </span>
            </div>

            <div className="relative overflow-hidden -mx-1">
              <motion.div
                className="flex items-center gap-6 sm:gap-8 md:gap-10"
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
                    className="relative h-8 w-20 sm:h-9 sm:w-24 md:h-10 md:w-28 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
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
