"use client";

import { motion } from "framer-motion";
import { PlayerProgressRing } from "./PlayerProgressRing";
import { PlayerControls } from "./PlayerControls";
import { PlayerTrackInfo } from "./PlayerTrackInfo";

interface Props {
  onCollapse: () => void;
}

export function MiniPlayerShell({ onCollapse }: Props) {
  return (
    <motion.div
      layoutId="mini-player"
      className="flex items-center gap-6 px-6 py-4 rounded-3xl bg-[#2a0f2d] backdrop-blur-md shadow-[0_0_50px_rgba(249,31,195,0.3)]"
      initial={{ borderRadius: 999 }}
      animate={{ borderRadius: 24 }}
    >
      <div onClick={onCollapse} className="relative">
        <PlayerProgressRing progress={0.65} />
        <div className="absolute w-14 h-14 rounded-full bg-[#f91fc3] flex items-center justify-center shadow-[0_0_20px_rgba(249,31,195,0.8)]">
          ▶
        </div>
      </div>
      <PlayerTrackInfo />
      <PlayerControls />
    </motion.div>
  );
}
