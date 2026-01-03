"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useLeadPopup } from "./LeadPopupContext";
import { useLoading } from "./LoadingContext";
import { trackClick } from "@/lib/gtag";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { openPopup } = useLeadPopup();
  const { setLoading } = useLoading();
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
    <nav className="w-full fixed left-0 z-50 bg-white/90 sm:bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-fullhd mx-auto px-3 sm:px-4 md:px-4 min-[700px]:px-6 lg:px-8 xl:px-12 2xl:px-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center group transition-all"
          aria-label="Swagatam Tech - Home"
          onClick={() => {
            trackClick("Logo", "navigation");
            setLoading(true);
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative h-12 w-32 min-[700px]:h-12 min-[700px]:w-20 sm:h-14 sm:w-24 md:h-16 md:w-28"
          >
            <Image
              src="/logo.png"
              alt="Swagatam Tech Logo - Website Development Agency"
              fill
              className="object-contain"
              style={{ backgroundColor: 'transparent' }}
              sizes="(max-width: 700px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
              priority
            />
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 min-[700px]:gap-3 lg:gap-6 xl:gap-8 text-[10px] min-[700px]:text-xs font-medium tracking-wide text-gray-600">
          {navItems.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                className="hover:text-black transition-colors whitespace-nowrap"
                onClick={() => {
                  trackClick(`${item.label} Navigation`, "navigation", {
                    destination: item.href,
                  });
                  setLoading(true);
                }}
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
          <Button 
            onClick={() => {
              trackClick("Book Strategy Call - Desktop", "cta", {
                location: "navbar_desktop",
              });
              openPopup();
            }}
            className="text-[10px] min-[700px]:text-xs px-2.5 min-[700px]:px-4 py-1.5 min-[700px]:py-2.5 min-h-[32px] min-[700px]:min-h-[44px] whitespace-nowrap"
            eventLabel="Book Strategy Call - Desktop"
          >
            <span className="hidden min-[800px]:inline">Book a strategy call</span>
            <span className="min-[800px]:hidden">Book Call</span>
          </Button>
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
              className="fixed top-0 left-0 w-[80%] sm:w-[60%] h-screen bg-white/90 backdrop-blur-xl z-[60] border-r border-gray-100 flex flex-col justify-between px-10 py-8 md:hidden overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* Top row with logo + close */}
              <div className="flex items-center justify-between mb-10">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => {
                    trackClick("Logo - Mobile", "navigation");
                    closeMenu();
                    setLoading(true);
                  }}
                  aria-label="Swagatam Tech - Home"
                >
                  <div className="relative h-14 w-32">
                    <Image
                      src="/logo.png"
                      alt="Swagatam Tech Logo"
                      fill
                      className="object-contain"
                      style={{ backgroundColor: 'transparent' }}
                      sizes="128px"
                    />
                  </div>
                </Link>

                <button
                  onClick={closeMenu}
                  className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                  aria-label="Close menu"
                >
                  <span className="sr-only">Close</span>
                  <div className="relative h-4 w-4">
                    <span className="absolute top-1/2 left-0 h-[2px] w-full bg-gray-800 rotate-45 -translate-y-1/2" />
                    <span className="absolute top-1/2 left-0 h-[2px] w-full bg-gray-800 -rotate-45 -translate-y-1/2" />
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
                      onClick={() => {
                        trackClick(`${item.label} Navigation - Mobile`, "navigation", {
                          destination: item.href,
                        });
                        closeMenu();
                        setLoading(true);
                      }}
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
                className="mt-10 pb-4"
              >
                <Button
                  className="w-full py-3 text-base font-semibold"
                  onClick={() => {
                    trackClick("Book Strategy Call - Mobile", "cta", {
                      location: "navbar_mobile",
                    });
                    closeMenu();
                    openPopup();
                  }}
                  eventLabel="Book Strategy Call - Mobile"
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
