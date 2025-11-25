"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  // Optional: hide on touch devices
  // (very basic check, good enough)
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Outer circle (smooth lag) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[80] hidden md:flex items-center justify-center rounded-full border border-gray-300/80 bg-white/30 backdrop-blur-sm"
        style={{
          width: 36,
          height: 36,
          x: position.x - 18,
          y: position.y - 18,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.4,
        }}
      />

      {/* Inner dot (sticks to cursor) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[81] hidden md:flex rounded-full bg-black"
        style={{
          width: 6,
          height: 6,
          x: position.x - 3,
          y: position.y - 3,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.3,
        }}
      />
    </>
  );
};

export default CustomCursor;
