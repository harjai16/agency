"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
   { label: "About", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
const router = useRouter();
  const openMenu = () => {
    setOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeMenu = () => {
    setOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };

  // Cleanup in case component unmounts while menu is open
  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  return (
    <nav className="w-full fixed  left-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-fullhd mx-auto px-20 py-4 flex items-center justify-between">
        
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
            Swagatam Tech
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
              {/* Underline animation */}
              <span
                className="pointer-events-none absolute left-0 bottom-[-3px] w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"
              />
            </li>
          ))}
        </ul>

        {/* CTA Button (Desktop) */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="hidden md:flex"
        >
          <Button>Book a strategy call</Button>
        </motion.div>

        {/* Mobile Hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden flex flex-col gap-1 z-[70]"
          onClick={openMenu}
          aria-label="Toggle menu"
        >
          <span className="w-5 h-[1.5px] bg-black" />
          <span className="w-5 h-[1.5px] bg-black" />
          <span className="w-5 h-[1.5px] bg-black" />
        </motion.button>
      </div>

      {/* Mobile Full-Screen Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md z-[55] md:hidden"
              onClick={closeMenu}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed top-0 left-0 w-[80%] sm:w-[60%] h-screen bg-white/90 backdrop-blur-xl z-[60] border-r border-gray-100 flex flex-col justify-between px-10 py-8 md:hidden"
            >
              {/* Top row with logo + close */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full border border-gray-300" />
                  <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                    AGENCY AI
                  </span>
                </div>

                <button
                  onClick={closeMenu}
                  className="flex items-center justify-center h-8 w-8 rounded-full border border-gray-200"
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close</span>
                  <div className="relative h-3 w-3">
                    <span className="absolute inset-0 h-[1px] w-full bg-black rotate-45" />
                    <span className="absolute inset-0 h-[1px] w-full bg-black -rotate-45" />
                  </div>
                </button>
              </div>

              {/* Links */}
              <ul className="space-y-8 text-lg font-medium text-gray-800">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className="hover:text-black transition"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* CTA bottom */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <Button
        className="w-full"
        onClick={() => router.push("/contact")}
      >
        Book a strategy call
      </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
