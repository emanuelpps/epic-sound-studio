"use client";

import { motion } from "framer-motion";

const bars = [1, 2, 3, 4, 5];

export default function EpicLoader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#230f1e] flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#f91fc3]/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="relative flex items-center justify-center mb-10"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-20 h-20 rounded-full border border-[#f91fc3]/40 flex items-center justify-center backdrop-blur-xl">
          <div className="flex gap-1">
            {bars.map((i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-[#f91fc3] rounded-full"
                animate={{
                  height: [12, 28, 12],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.12,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
      <motion.h1
        className="text-sm tracking-[0.4em] text-[#f91fc3] font-semibold mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        EPIC SOUND STUDIO
      </motion.h1>
      <motion.p
        className="text-sm text-gray-400"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Initializing audio universe…
      </motion.p>
    </div>
  );
}
