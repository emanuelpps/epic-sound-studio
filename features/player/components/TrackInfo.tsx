"use client";

import Image from "next/image";
import { usePlayerStore } from "@/stores/playerStore";
import WaveProgress from "@/shared/components/ui/ProgressBar/WaveProgress";
import PlayIcon from "@/shared/components/ui/Icons/Play";
import LikeFill from "@/shared/components/ui/Icons/LikeFill";
import RepostIcon from "@/shared/components/ui/Icons/Repost";
import { TrackInfoSkeleton } from "@/shared/components/ui/Skeletons/TrackInfoSkeleton";
import { DotsGlowLoader } from "@/shared/components/ui/Loaders/DotsGlowLoader";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function TrackInfo() {
  const trackData = usePlayerStore((s) => s.trackData);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const duration = usePlayerStore((s) => s.duration);

  const [wavesReady, setWavesReady] = useState(false);

  if (!trackData) return <TrackInfoSkeleton />;

  const artwork = trackData.artwork?.["480x480"] ?? "/images/placeholder.jpg";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Artwork */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack?.trackId ?? "artwork"}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-[300px] h-[300px] rounded-3xl overflow-hidden mb-7"
          style={{
            boxShadow: "0 0 50px rgba(0,255,255,0.35), 0 0 80px rgba(249,31,195,0.15)",
          }}
        >
          <Image
            src={artwork}
            alt={trackData.title}
            fill
            sizes="300px"
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Title & artist */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrack?.trackId ?? "meta"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-1 mb-5"
        >
          <h1
            className="text-2xl font-bold tracking-wide max-w-[340px] truncate"
            title={trackData.title}
          >
            {trackData.title}
          </h1>
          <p className="text-base text-gray-400">{trackData.user.name}</p>
        </motion.div>
      </AnimatePresence>

      {/* Stats */}
      <div className="flex gap-6 mb-7 text-sm text-gray-400">
        <span className="flex items-center gap-1.5">
          <PlayIcon />
          <span>{(trackData.play_count ?? 0).toLocaleString()}</span>
          <span className="font-semibold text-cyan-400">PLAYS</span>
        </span>
        <span className="flex items-center gap-1.5">
          <LikeFill />
          <span>{(trackData.favorite_count ?? 0).toLocaleString()}</span>
          <span className="font-semibold text-[#A4506C]">LIKES</span>
        </span>
        <span className="flex items-center gap-1.5">
          <RepostIcon className="text-[1.2rem]" />
          <span>{(trackData.repost_count ?? 0).toLocaleString()}</span>
          <span className="font-semibold text-[#F91FC3]">REPOSTS</span>
        </span>
      </div>

      {/* Waveform */}
      <div className="relative w-[85%] mb-1">
        <AnimatePresence>
          {!wavesReady && (
            <motion.div
              key="wave-loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <DotsGlowLoader />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: wavesReady ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <WaveProgress
            onReady={() => setWavesReady(true)}
            onReset={() => setWavesReady(false)}
          />
        </motion.div>
      </div>

      {/* Time display */}
      <div className="flex justify-between w-[85%] text-xs text-gray-500 font-mono px-0.5 mb-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
