"use client";

import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { PlayerProgressRing } from "./PlayerProgressRing";

interface Props {
  onExpand: () => void;
}

export function PlayerFAB({ onExpand }: Props) {
  return (
    <motion.div
      layoutId="mini-player"
      onClick={onExpand}
      className="relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <PlayerProgressRing progress={0.65} />
      <div className="absolute w-16 h-16 rounded-full bg-[#f91fc3] flex items-center justify-center shadow-[0_0_30px_rgba(249,31,195,0.8)]">
        <FaPlay className="text-white text-lg ml-1" />
      </div>
    </motion.div>
  );
}
