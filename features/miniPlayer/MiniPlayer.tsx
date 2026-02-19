"use client";
import { handlePause } from "@/lib/functions/handlePause";
import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerProgressRing } from "./components/PlayerProgressRing";
import { PlayerTrackInfo } from "./components/PlayerTrackInfo";

export function MiniPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);

  if (!currentTrack) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay(
        currentTrack.trackId,
        currentTrack.title,
        currentTrack.artist,
        play,
      );
    }
  };

  return (
    <motion.div
      initial={false}
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={{
        collapsed: { width: 96, borderRadius: 999 },
        expanded: { width: 420, borderRadius: 24 },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="fixed bottom-10 right-1 -translate-x-2 h-24 bg-[#2a0f2d] flex items-center overflow-hidden shadow-[0_0_40px_rgba(249,31,195,0.3)] z-50"
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
    >
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        {!isExpanded && <PlayerProgressRing />}

        <div
          className={`absolute w-16 h-16 rounded-full bg-[#f91fc3] flex items-center justify-center shadow-[0_0_25px_rgba(249,31,195,0.8)] z-10 ${isExpanded && "cursor-pointer"}`}
          onClick={handleTogglePlay}
        >
          {isPlaying ? (
            <FaPause className="text-white text-lg" />
          ) : (
            <FaPlay className="text-white text-lg ml-1" />
          )}
        </div>
      </div>

      <motion.div
        variants={{
          collapsed: { opacity: 0, x: -20 },
          expanded: { opacity: 1, x: 0 },
        }}
        className="flex items-center gap-6 px-6"
      >
        <PlayerTrackInfo />
        <PlayerControls />
      </motion.div>
    </motion.div>
  );
}
