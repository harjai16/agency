"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

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

  // Detect clickable elements
  useEffect(() => {
    const elements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
    );

    const enter = () => setIsPointer(true);
    const leave = () => setIsPointer(false);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  // Disable on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] hidden md:flex rounded-full border"
        style={{
          width: isPointer ? 52 : 46,
          height: isPointer ? 52 : 46,
          x: position.x - (isPointer ? 26 : 23),
          y: position.y - (isPointer ? 26 : 23),
          opacity: visible ? 1 : 0,
          borderColor: isPointer ? "rgba(249,115,22,0.9)" : "rgba(253,186,116,0.8)",
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.4,
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10001] hidden md:flex rounded-full"
        style={{
          width: isPointer ? 10 : 6,
          height: isPointer ? 10 : 6,
          x: position.x - (isPointer ? 5 : 3),
          y: position.y - (isPointer ? 5 : 3),
          opacity: visible ? 1 : 0,
          backgroundColor: isPointer ? "rgba(249,115,22,1)" : "black",
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
