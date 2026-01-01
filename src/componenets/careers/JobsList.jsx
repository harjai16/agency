"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "@/componenets/ui/Section";
import JobCard from "./JobCard";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

const JobsList = ({ jobs }) => {
  return (
    <Section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-fullhd mx-auto space-y-8">
        <motion.div {...fadeUp(0)} className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
            Open positions
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900">
            Current Job Openings
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-500">
            We're always looking for talented people to join our team. Check out our current openings below.
          </p>
        </motion.div>
        <motion.div
          {...fadeUp(0.05)}
          className="grid gap-4 sm:gap-5 md:grid-cols-2"
        >
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default JobsList;

