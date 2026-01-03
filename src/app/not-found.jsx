"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/componenets/ui/Button";
import Section from "@/componenets/ui/Section";
import NotFoundHero from "@/componenets/404/NotFoundHero";
import PageLinksGrid from "@/componenets/404/PageLinksGrid";
import MiniGame from "@/componenets/404/MiniGame";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 flex items-center justify-center py-12 sm:py-16 md:py-20">
      <Section className="w-full">
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {/* Hero Section */}
          <NotFoundHero />

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Page Links Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <PageLinksGrid />
          </motion.div>

          {/* Mini Game */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <MiniGame />
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center space-y-2"
          >
            <p className="text-sm sm:text-base text-gray-500">
              While you&apos;re here, why not check out our amazing services? 🚀
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>✨</span>
              <span>Fast Performance</span>
              <span>•</span>
              <span>Modern Design</span>
              <span>•</span>
              <span>SEO Optimized</span>
              <span>✨</span>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}

