"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export function GlowSkeleton({ className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-xl pointer-events-none ${className}`}>
      <div className="absolute inset-0 bg-[#1a0f1f]" />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          boxShadow:
            "inset 0 0 40px rgba(249,31,195,0.25), inset 0 0 80px rgba(249,31,195,0.12)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(249,31,195,0.25), transparent)",
        }}
      />
    </div>
  );
}
