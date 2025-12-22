"use client";

import React from "react";
import processSteps from "@/data/process.json";

const Process = () => {
  return (
    <section
      id="process"
      aria-label="Our workflow"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white"
    >
      <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gray-400">
            Workflow
          </p>
          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            How we work
          </h2>
        </div>

        {/* Desktop / tablet timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* horizontal line */}
            <div className="absolute left-0 right-0 top-10 h-px bg-gray-200" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
