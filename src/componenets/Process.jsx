"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import processSteps from "@/data/process.json";

const BG_GRADIENTS = [
  "from-[#fefce8] via-white to-[#e0f2fe]", // warm yellow -> blue
  "from-[#fdf2f8] via-white to-[#e0f2fe]", // pink -> blue
  "from-[#eef2ff] via-white to-[#ecfdf5]", // indigo -> mint
  "from-[#f5f3ff] via-white to-[#fee2e2]", // soft purple -> red
];

const Process = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Watch scroll progress within the process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sync active step index with scroll progress
  useEffect(() => {
    const steps = processSteps.length;

    const unsub = scrollYProgress.on("change", (v) => {
      // v goes 0 → 1 across the whole tall container
      const idx = Math.min(steps - 1, Math.floor(v * steps + 0.0001));
      setActiveIndex(idx);
    });

    return () => unsub();
  }, [scrollYProgress]);

  // Scroll to a specific step when clicking the indicators
  const handleIndicatorClick = (index) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const startY = window.scrollY + rect.top;

    const steps = processSteps.length;
    const totalScrollable =
      steps * window.innerHeight - window.innerHeight; // (steps - 1) * 100vh

    const targetY =
      startY + (index / (steps - 1 || 1)) * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="process"
      aria-label="Our process "
      className="py-20"
    >
      {/* Break out of container padding so slides can breathe */}
      <div className="-mx-6 md:-mx-10 lg:-mx-20">
        {/* Tall container: N*100vh so we have room to scroll
            while the inner sticky viewport stays fixed */}
        <div
          ref={containerRef}
          style={{ height: `${processSteps.length * 100}vh` }}
          className="relative"
        >
          {/* Sticky full-screen viewport */}
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* All slides stacked on top of each other */}
            <div className="relative w-full h-full">
              {processSteps.map((step, index) => {
                const isActive = index === activeIndex;
                const gradient =
                  BG_GRADIENTS[index % BG_GRADIENTS.length];

                // alternate slide direction a bit for nicer feel
                const enterFrom = index % 2 === 0 ? 80 : -80;
                const exitTo = index % 2 === 0 ? -80 : 80;

                return (
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, x: enterFrom }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : exitTo,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {/* FULL-SCREEN SLIDE */}
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Unique gradient background per slide */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                      />

                      {/* Centered card */}
                      <div className="relative z-[1] h-full w-full flex items-center justify-center px-4 md:px-10">
                        <div className="relative w-full max-w-6xl h-[80vh] md:h-[70vh] rounded-[2rem] border border-white/60 bg-white/80 backdrop-blur-xl px-6 py-7 md:px-10 md:py-10 shadow-[0_26px_70px_rgba(15,23,42,0.15)]">
                          {/* subtle glow */}
                          <div className="pointer-events-none absolute -top-10 right-16 h-32 w-32 rounded-full bg-white/50 blur-3xl" />

                          <div className="relative z-[1] grid w-full h-full gap-10 md:gap-16 md:grid-cols-2 items-center">
                            {/* Left: main text */}
                            <div className="space-y-5 max-w-xl">
                              {/* Top labels */}
                              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                                <span>Process</span>
                                <span className="h-[1px] w-8 bg-gray-200" />
                                <span>Step {step.step}</span>
                              </div>

                              {/* Title */}
                              <h2 className="text-2xl md:text-3xl lg:text-[2.4rem] font-semibold tracking-tight text-gray-900">
                                {step.label}
                              </h2>

                              {/* Description */}
                              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                {step.description}
                              </p>

                              {/* Meta */}
                              <p className="text-[11px] md:text-xs text-gray-400">
                                {step.meta}
                              </p>
                            </div>

                            {/* Right: meta / progress */}
                            <div className="flex flex-col items-start md:items-end gap-6 md:gap-8">
                              {/* Phase badge */}
                              <div className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white/80 px-3 py-1 text-[11px] text-gray-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                {index === 0
                                  ? "Kickoff & alignment"
                                  : index === processSteps.length - 1
                                  ? "Launch & iterate"
                                  : "In-flight phase"}
                              </div>

                              {/* Big step number */}
                              <div className="flex items-center gap-3 md:justify-end">
                                <span className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
                                  Step
                                </span>
                                <span className="text-4xl md:text-5xl font-semibold text-gray-900 leading-none">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>

                              {/* Progress bar */}
                              <div className="w-full md:w-64 space-y-2">
                                <div className="flex items-center justify-between text-[11px] text-gray-400">
                                  <span>Phase progress</span>
                                  <span>
                                    {index + 1} / {processSteps.length}
                                  </span>
                                </div>
                                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-gray-900 transition-all duration-500"
                                    style={{
                                      width: `${
                                        ((index + 1) /
                                          processSteps.length) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Tiny helper note */}
                              <p className="text-[11px] text-gray-400 max-w-xs md:text-right">
                                Scroll to move through each step. This section
                                stays full screen until the final slide is done,
                                so the story stays focused.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Step indicator synced with scroll */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gray-100 bg-white/90 px-3 py-1.5 shadow-sm">
              {processSteps.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleIndicatorClick(index)}
                    className="group relative flex items-center"
                  >
                    <div
                      className={[
                        "h-1.5 rounded-full transition-all duration-300",
                        isActive ? "w-6 bg-gray-900" : "w-2 bg-gray-300",
                      ].join(" ")}
                    />
                    <span className="sr-only">
                      Go to step {index + 1}: {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
