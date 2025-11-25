"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-all"
        >
          <motion.span
            whileHover={{ rotate: 10, scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="h-6 w-6 rounded-full border border-gray-300"
          />
          <span className="text-sm font-semibold tracking-[0.18em] uppercase group-hover:opacity-70 transition">
            AGENCY AI
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-xs font-medium tracking-wide text-gray-600">
          {navItems.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                className="hover:text-black transition-colors"
              >
                {item.label}
              </Link>
              {/* Underline Animation */}
              <span
                className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"
              />
            </li>
          ))}
        </ul>

        {/* CTA Button (Desktop) */}
        <motion.div whileHover={{ scale: 1.04 }} className="hidden md:flex">
          <Button>Book a strategy call</Button>
        </motion.div>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-[1.5px] bg-black" />
          <span className="w-5 h-[1.5px] bg-black" />
          <span className="w-5 h-[1.5px] bg-black" />
        </motion.button>
      </div>

      {/* Mobile Menu Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-4 overflow-hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-sm font-medium text-gray-700 hover:text-black transition"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="ghost" className="w-full">
              Book a strategy call
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
