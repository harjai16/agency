"use client";

import React from "react";
import processSteps from "@/data/process.json";

const Process = () => {
  return (
    <section
      id="process"
      aria-label="Our workflow"
      className="py-20 md:py-24 bg-white"
    >
      <div className="max-w-fullhd mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-400">
            Workflow
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            How we work
          </h2>
        </div>

        {/* Desktop / tablet timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* horizontal line */}
            <div className="absolute left-0 right-0 top-10 h-px bg-gray-200" />

            <div className="grid grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Step label */}
                    <p className="text-sm font-medium text-gray-800 mb-6">
                      Step {stepNumber}
                    </p>

                    {/* Dot on the line */}
                    <div className="relative mb-10">
                      <div className="h-4 w-4 rounded-full bg-lime-400 border-4 border-white shadow-[0_0_0_2px_rgba(190,242,100,0.55)]" />
                    </div>

                    {/* Big ghost number + title + copy */}
                    <div className="relative pt-6">
                      {/* Ghost number */}
                      <span className="pointer-events-none select-none text-[80px] font-semibold leading-none text-gray-100 absolute -top-10 left-1/2 -translate-x-1/2">
                        {stepNumber}
                      </span>

                      <h3 className="relative text-base md:text-lg font-semibold text-gray-900">
                        {step.label}
                      </h3>
                      <p className="relative mt-3 text-sm text-gray-500 max-w-xs mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile stacked version */}
        <div className="md:hidden space-y-10">
          {processSteps.map((step, index) => {
            const stepNumber = String(index + 1).padStart(2, "0");
            return (
              <div
                key={step.id}
                className="relative pl-6 border-l border-gray-200"
              >
                {/* dot */}
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-lime-400 border-4 border-white shadow-[0_0_0_2px_rgba(190,242,100,0.55)]" />

                <p className="text-xs font-medium text-gray-600 mb-1">
                  Step {stepNumber}
                </p>
                <h3 className="text-base font-semibold text-gray-900">
                  {step.label}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
