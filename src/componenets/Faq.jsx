"use client";
import React, { useState } from "react";
import FAQ from "@/componenets/ui/FAQ";
const servicesFAQ = [
  {
    question: "Can we start with just design?",
    answer:
      "Yes — you can hire us for strategy + design only or full build.",
  },
  {
    question: "What about revisions?",
    answer:
      "We always include refinement rounds until it meets approval.",
  },
];
const Faq = () => {



  return (
 <>
      {/* Sections */}
      <FAQ
        title="Services & Delivery"
        subtitle="Quick answers about what we offer"
        items={servicesFAQ}
      />
    </>
  );
};

export default Faq;
