"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MiniGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [showMessage, setShowMessage] = useState(false);
  const [clickEffect, setClickEffect] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setShowMessage(true);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    let moveInterval = null;
    if (isPlaying) {
      moveInterval = setInterval(() => {
        moveTarget();
      }, 1500); // Auto-move every 1.5 seconds
    }
    return () => clearInterval(moveInterval);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setShowMessage(false);
    moveTarget();
  };

  const moveTarget = () => {
    const x = Math.random() * 80 + 10; // 10-90%
    const y = Math.random() * 80 + 10; // 10-90%
    setTarget({ x, y });
  };

  const handleClick = () => {
    if (isPlaying) {
      setScore((prev) => prev + 1);
      moveTarget();
      // Show click effect
      setClickEffect({ x: target.x, y: target.y });
      setTimeout(() => setClickEffect(null), 300);
    }
  };

  return (
    <div className="space-y-4">
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl sm:text-2xl font-semibold text-gray-900 text-center"
      >
        🎮 Quick Game
      </motion.h3>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 sm:p-8 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{score}</div>
            <div className="text-xs sm:text-sm text-gray-500">Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{timeLeft}</div>
            <div className="text-xs sm:text-sm text-gray-500">Time</div>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl border-2 border-gray-200 h-64 sm:h-80 overflow-hidden">
          {!isPlaying ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
            >
              <p className="text-sm sm:text-base text-gray-600 text-center px-4">
                {showMessage
                  ? `Game Over! You scored ${score} points! 🎉`
                  : "Click the moving target as many times as you can in 30 seconds!"}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                {showMessage ? "Play Again" : "Start Game"}
              </motion.button>
            </motion.div>
          ) : (
            <>
              <motion.button
                onClick={handleClick}
                className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10 cursor-pointer"
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              />
              {clickEffect && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-emerald-400 rounded-full pointer-events-none"
                  style={{
                    left: `${clickEffect.x}%`,
                    top: `${clickEffect.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </>
          )}
        </div>

        <AnimatePresence>
          {isPlaying && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-xs sm:text-sm text-gray-500 mt-4"
            >
              Click the green circle to score points! 🎯
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MiniGame;

