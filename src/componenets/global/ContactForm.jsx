"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/componenets/ui/Button";

const ContactForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative rounded-2xl sm:rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute -top-10 right-10 h-28 w-28 rounded-full bg-gradient-to-tr from-gray-100 via-white to-gray-50 blur-2xl" />

      <form
        className="relative z-[1] space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          // TODO: hook up to API / form tool (Formspree, Web3Forms, custom API, etc.)
        }}
      >
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
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
            Company / Brand
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0"
            placeholder="Swagatam Foods, Studio XYZ…"
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
            <option value="new-website">New website from scratch</option>
            <option value="redesign">Redesign of existing website</option>
            <option value="landing-page">High-converting landing page</option>
            <option value="ecommerce">E-commerce / product website</option>
            <option value="web-app">Web app / dashboard UI</option>
            <option value="other">Something else</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="text-xs font-medium text-gray-700"
          >
            Project details & goals
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-0 resize-none"
            placeholder="Share where your current website is today (or if you don’t have one) and what you’d like it to achieve in the next 3–6 months."
          />
        </div>

        {/* Submit + note */}
        <div className="flex flex-col gap-2 pt-2">
          <Button type="submit" className="w-full md:w-auto">
            Send message
          </Button>
          <p className="text-[11px] text-gray-400">
            Swagatam Tech will only use your details to respond to this inquiry.
            No newsletters, no spam.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
