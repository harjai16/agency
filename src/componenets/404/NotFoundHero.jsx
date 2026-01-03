"use client";

import { motion } from "framer-motion";

const NotFoundHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative inline-block"
      >
        <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
          404
        </h1>
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute -top-4 -right-4 text-4xl"
        >
          🤔
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900"
      >
        Oops! Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm sm:text-base md:text-lg text-gray-500 max-w-xl mx-auto"
      >
        The page you&apos;re looking for seems to have wandered off. 
        Don&apos;t worry, we&apos;ll help you find your way back!
      </motion.p>
    </motion.div>
  );
};

export default NotFoundHero;

