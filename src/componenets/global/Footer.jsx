"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SocialShare from "./SocialShare";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white">
      <div className="max-w-fullhd mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12 lg:py-14 grid gap-8 sm:gap-10 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 mb-4 group"
            aria-label="Swagatam Tech - Home"
          >
            <div className="relative h-8 w-8 sm:h-9 sm:w-9">
              <Image
                src="/logo.png"
                alt="Swagatam Tech Logo - Website Development Agency"
                fill
                className="object-contain group-hover:opacity-80 transition-opacity"
                sizes="(max-width: 640px) 32px, 36px"
              />
            </div>
            <span className="text-sm font-semibold tracking-[0.18em] uppercase">
              Swagatam Tech
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xs leading-relaxed">
            We design websites that convert visitors into customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold tracking-wide text-gray-700 mb-4 uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-black transition-colors"
                  aria-label={`Navigate to ${item.label} page`}
                >
                  {item.label === "Contact" ? "Get in touch" : item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials & Share */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-gray-700 mb-4 uppercase">
              Follow Us
            </h4>
            <div className="flex gap-4 sm:gap-5 text-xs sm:text-sm text-gray-600">
              {socials.map((s) => (
                <motion.a
                  whileHover={{ scale: 1.08 }}
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <SocialShare 
              url="/"
              title="Swagatam Tech - Website Development Agency"
              description="High-performance website development agency. Strategy, UX, and development focused on leads, conversions, and growth."
              variant="compact"
            />
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-100 py-3 sm:py-4 md:py-5 text-center text-[10px] sm:text-xs text-gray-500">
        © {new Date().getFullYear()} AGENCY AI — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
