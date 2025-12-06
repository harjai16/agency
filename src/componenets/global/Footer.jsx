"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
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
      <div className="fullhd  mx-auto px-20 py-14 grid gap-10 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-7 w-7 rounded-full border border-gray-300" />
            <span className="text-sm font-semibold tracking-[0.18em] uppercase">
              SWAGATAM TECH
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            We design websites that convert visitors into customers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold tracking-wide text-gray-700 mb-4 uppercase">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-xs font-semibold tracking-wide text-gray-700 mb-4 uppercase">
            Follow Us
          </h4>
          <div className="flex gap-5 text-sm text-gray-600">
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
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-100 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} AGENCY AI — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
