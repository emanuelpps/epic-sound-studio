"use client";

import { motion, Variants } from "framer-motion";

const letterVariants: Variants = {
  hover: {
    y: -6,
    scale: 1.12,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 18,
    },
  },
};

function AnimatedText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          whileHover="hover"
          className="inline-block cursor-default"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeadLine() {
  return (
    <h1 className="max-w-4xl mb-8 text-5xl text-white uppercase hero-headline md:text-6xl leading-tight font-[900]">
      <AnimatedText text="YOUR " />
      <AnimatedText text="SOUND" className="text-[#f91fc3] italic text-glow" />
      <br />
      <AnimatedText text="YOUR RULES" />
    </h1>
  );
}
