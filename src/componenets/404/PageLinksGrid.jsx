"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pageLinks = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/about", label: "About Us", icon: "👥" },
  { href: "/services", label: "Services", icon: "⚙️" },
  { href: "/portfolio", label: "Portfolio", icon: "💼" },
  { href: "/case-studies", label: "Case Studies", icon: "📊" },
  { href: "/blogs", label: "Blogs", icon: "📝" },
  { href: "/contact", label: "Contact", icon: "📧" },
  { href: "/careers", label: "Careers", icon: "💼" },
  { href: "/bussines-consultancy", label: "Business Consultancy", icon: "💡" },
];

const PageLinksGrid = () => {
  return (
    <div className="space-y-4">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-semibold text-gray-900 text-center"
      >
        Explore Our Pages
      </motion.h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {pageLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={link.href}
              className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
            >
              <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {link.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PageLinksGrid;

