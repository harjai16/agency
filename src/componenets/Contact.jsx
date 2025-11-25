"use client";
import React from "react";
import { motion } from "framer-motion";
import Section from "./ui/Section";
import Button from "./ui/Button";

const Contact = () => {
  return (
    <Section
      id="contact"
      aria-label="Contact and inquiries"
      className="py-20 md:py-28 bg-white"
    >
      <div className="grid gap-10 md:gap-16 md:grid-cols-[1.1fr_minmax(0,1fr)] items-start">
        {/* Left: CTA copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Contact
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-[2.4rem] font-semibold tracking-tight text-gray-900">
            Ready to ship an AI product
            <br className="hidden md:block" /> your team is proud of?
          </h2>

          <p className="text-sm md:text-base text-gray-500 max-w-lg leading-relaxed">
            Tell us a bit about your product, your team and what &quot;good&quot; looks
            like for you. We&apos;ll come back within one business day with
            next steps – usually a short chemistry call.
          </p>

          <div className="space-y-2 text-xs md:text-sm text-gray-500">
            <p>
              Prefer email? Drop us a line at{" "}
              <a
                href="mailto:hello@agencyai.studio"
                className="underline underline-offset-4 decoration-gray-300 hover:decoration-gray-800"
              >
                hello@agencyai.studio
              </a>
              .
            </p>
            <p>
              Typical projects start at{" "}
              <span className="font-medium text-gray-900">$Xk+</span> and run
              for <span className="font-medium text-gray-900">4–12 weeks</span>.
            </p>
          </div>
        </motion.div>

        {/* Right: Contact form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm p-6 md:p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
        >
          {/* Glow accent */}
          <div className="pointer-events-none absolute -top-10 right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-gray-100 via-white to-gray-50 blur-2xl" />

          <form
            className="relative z-[1] space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              // hook up to API / form tool later
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-gray-700"
                >
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-1.5">
              <label
                htmlFor="company"
                className="text-xs font-medium text-gray-700"
              >
                Company / Team
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
                placeholder="Company name"
              />
            </div>

            {/* Project type */}
            <div className="space-y-1.5">
              <label
                htmlFor="projectType"
                className="text-xs font-medium text-gray-700"
              >
                What are you looking to build?
              </label>
              <select
                id="projectType"
                name="projectType"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="ai-product">
                  New AI product / feature
                </option>
                <option value="automation">
                  Workflow automation / agents
                </option>
                <option value="dashboard">
                  Analytics / AI dashboard
                </option>
                <option value="strategy">
                  AI strategy & roadmapping
                </option>
                <option value="other">
                  Something else
                </option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-xs font-medium text-gray-700"
              >
                Context & goals
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0 resize-none"
                placeholder="Where are you today, and what does success look like in 3–6 months?"
              />
            </div>

            {/* Budget / timeline (optional) */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="budget"
                  className="text-xs font-medium text-gray-700"
                >
                  Ballpark budget (optional)
                </label>
                <input
                  id="budget"
                  name="budget"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
                  placeholder="$25k, $50k+, not sure…"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="timeline"
                  className="text-xs font-medium text-gray-700"
                >
                  Ideal timeline
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  type="text"
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
                  placeholder="e.g. Pilot in 6 weeks"
                />
              </div>
            </div>

            {/* Submit + small note */}
            <div className="flex flex-col gap-2 pt-2">
              <Button type="submit" className="w-full md:w-auto">
                Send message
              </Button>
              <p className="text-[11px] text-gray-400">
                We&apos;ll only use your details to respond to this inquiry. No
                newsletters, no spam.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
