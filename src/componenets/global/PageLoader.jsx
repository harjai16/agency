"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PageLoader = ({ isLoading }) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-white/95 backdrop-blur-md z-[9999]"
        >
          {/* Loader Content */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Logo with pulse animation */}
              <motion.div
                className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/logo.jpeg"
                  alt="Swagatam Tech Logo"
                  fill
                  className="object-contain"
                  style={{ backgroundColor: 'transparent' }}
                  sizes="112px"
                  priority
                />
              </motion.div>

              {/* Progress bar container */}
              <div className="w-48 sm:w-56 md:w-64 h-1 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 rounded-full"
                  initial={{ width: "0%", x: "-100%" }}
                  animate={{ 
                    width: ["0%", "100%"],
                    x: ["-100%", "0%"]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Loading text with dots animation */}
              <motion.div
                className="flex items-center gap-1"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide uppercase">
                  Loading
                </span>
                <motion.span
                  className="text-xs sm:text-sm text-gray-500 font-medium"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                >
                  .
                </motion.span>
                <motion.span
                  className="text-xs sm:text-sm text-gray-500 font-medium"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  .
                </motion.span>
                <motion.span
                  className="text-xs sm:text-sm text-gray-500 font-medium"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                >
                  .
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

