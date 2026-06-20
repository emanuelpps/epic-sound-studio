"use client";

import { handlePause } from "@/lib/functions/handlePause";
import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlayerControls } from "./components/PlayerControls";
import { PlayerProgressRing } from "./components/PlayerProgressRing";
import { PlayerTrackInfo } from "./components/PlayerTrackInfo";
import { useUIStore } from "@/stores/uiStore";
import PlayIcon from "../Icons/Play";
import PauseIcon from "../Icons/Pause";
import { getTrack } from "@/services/tracks/getTrack";

export function MiniPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const fetchRef = useRef<AbortController | null>(null);

  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const trackData = usePlayerStore((s) => s.trackData);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isLoading = usePlayerStore((s) => s.isLoading);
  const play = usePlayerStore((s) => s.play);
  const view = useUIStore((s) => s.view);
  const setView = useUIStore((s) => s.setView);
  const setDataTrack = usePlayerStore((s) => s.setTrackData);

  useEffect(() => {
    if (!currentTrack?.trackId) return;

    // Cancel any in-flight fetch for the previous track
    fetchRef.current?.abort();
    fetchRef.current = new AbortController();

    setDataTrack(null);

    const fetchTrack = async () => {
      try {
        const track = await getTrack(currentTrack.trackId);
        setDataTrack(track);
      } catch {
        // aborted or error — ignore
      }
    };

    fetchTrack();
  }, [currentTrack?.trackId]);

  if (!currentTrack) return null;

  const handleTogglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay(currentTrack.trackId, currentTrack.title, currentTrack.artist, play);
    }
  };

  if (view === "player") return null;

  const artwork =
    trackData?.artwork?.["150x150"] ??
    trackData?.artwork?.["480x480"] ??
    "/images/placeholder.jpg";

  return (
    <>
      {/* ── Mobile: compact bar pinned above the tab bar ─────────── */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="md:hidden fixed bottom-[84px] inset-x-2 z-50 flex items-center gap-3 rounded-2xl bg-[#2a0f2d]/95 backdrop-blur-lg border border-[#f91fc3]/20 p-2 pr-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        {/* Tap track info → open full player */}
        <button
          onClick={() => setView("player")}
          className="flex items-center gap-3 min-w-0 flex-1 text-left active:scale-[0.98] transition-transform"
          aria-label="Open full player"
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/40">
            <Image src={artwork} alt="" fill sizes="48px" className="object-cover" unoptimized />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{currentTrack.title}</p>
            <p className="text-xs text-white/50 truncate">{currentTrack.artist}</p>
          </div>
        </button>

        {/* Play / pause */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="shrink-0 w-11 h-11 rounded-full bg-[#f91fc3] flex items-center justify-center active:scale-95 transition-transform"
          style={{ boxShadow: "0 0 16px rgba(249,31,195,0.6)" }}
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <PauseIcon className="text-white text-base" />
          ) : (
            <PlayIcon className="text-white text-base ml-0.5" />
          )}
        </button>
      </motion.div>

      {/* ── Desktop: circular widget that expands on hover ───────── */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isExpanded
            ? { y: 0, opacity: 1, width: 540, borderRadius: 24 }
            : { y: 0, opacity: 1, width: 96, borderRadius: 999 }
          }
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="hidden md:flex fixed bottom-10 right-3 h-24 bg-[#2a0f2d] items-center overflow-hidden z-50"
          style={{ boxShadow: "0 0 40px rgba(249,31,195,0.3), 0 8px 32px rgba(0,0,0,0.5)", willChange: "width" }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
        >
          {/* Play/Pause button */}
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            {!isExpanded && <PlayerProgressRing />}
            <button
              onClick={handleTogglePlay}
              className="absolute w-14 h-14 rounded-full bg-[#f91fc3] flex items-center justify-center z-10 transition-transform hover:scale-105 active:scale-95"
              style={{ boxShadow: "0 0 20px rgba(249,31,195,0.8)" }}
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <PauseIcon className="text-white text-base" />
              ) : (
                <PlayIcon className="text-white text-base ml-0.5" />
              )}
            </button>
          </div>

          {/* Expanded content */}
          <motion.div
            animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-4 px-4 min-w-0 flex-1"
          >
            <PlayerTrackInfo />
            <PlayerControls />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
