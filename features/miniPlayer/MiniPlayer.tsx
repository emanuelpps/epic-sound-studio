"use client";

import { motion } from "framer-motion";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerProgressRing } from "./components/PlayerProgressRing";
import { PlayerTrackInfo } from "./components/PlayerTrackInfo";
import { FaPlay } from "react-icons/fa";
import { usePlayerStore } from "@/stores/playerStore";

export function MiniPlayer() {
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  if (!isPlaying) return null;
  return (
    <motion.div
      initial={false}
      whileHover="expanded"
      animate="collapsed"
      variants={{
        collapsed: {
          width: 96,
          borderRadius: 999,
        },
        expanded: {
          width: 420,
          borderRadius: 24,
        },
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      className="fixed bottom-6 right-1 -translate-x-2 h-24 bg-[#2a0f2d] flex items-center overflow-hidden shadow-[0_0_40px_rgba(249,31,195,0.3)] z-50"
    >
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <PlayerProgressRing progress={0.65} />
        <div className="absolute w-16 h-16 rounded-full bg-[#f91fc3] flex items-center justify-center shadow-[0_0_25px_rgba(249,31,195,0.8)]">
          <FaPlay className="text-white text-lg ml-1" />
        </div>
      </div>
      <motion.div
        variants={{
          collapsed: { opacity: 0, x: -20 },
          expanded: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-6 px-6"
      >
        <PlayerTrackInfo />
        <PlayerControls />
      </motion.div>
    </motion.div>
  );
}
