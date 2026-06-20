"use client";

import { useUndergroundTrendingTracks } from "@/queries/useUndergroundTrendingTracks";
import { mapTrackToUI } from "@/services/mappers";
import { usePlayerStore } from "@/stores/playerStore";
import { useUIStore } from "@/stores/uiStore";
import { handlePlay } from "@/lib/functions/handlePlay";
import formatNumber from "@/lib/utils/formatNumber";
import { GlowSkeleton } from "@/shared/components/ui/Skeletons/GlowSkeleton";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiChevronLeft } from "react-icons/hi2";
import { RiPlayFill } from "react-icons/ri";
import { IoFlameOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

/* ── helpers ─────────────────────────────────────────── */
const rankAccent = (rank: number) => {
  if (rank === 1) return { ring: "#FFD24A", glow: "rgba(255,210,74,0.5)" };
  if (rank === 2) return { ring: "#D8DCE6", glow: "rgba(216,220,230,0.4)" };
  if (rank === 3) return { ring: "#E0894B", glow: "rgba(224,137,75,0.45)" };
  return { ring: "#f91fc3", glow: "rgba(249,31,195,0.35)" };
};

/* ── one ranked row ──────────────────────────────────── */
function ChartRow({
  rank,
  track,
  isActive,
  isPlaying,
  onPlay,
  onArtist,
}: {
  rank: number;
  track: ReturnType<typeof mapTrackToUI>;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: () => void;
  onArtist: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const accent = rankAccent(rank);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(rank * 0.025, 0.5) }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onClick={onPlay}
      className={`group flex items-center gap-3 sm:gap-4 rounded-2xl px-3 sm:px-4 py-3 cursor-pointer border transition-all ${
        isActive
          ? "bg-[#f91fc3]/10 border-[#f91fc3]/25"
          : "border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
      }`}
    >
      {/* Rank */}
      <div className="w-8 sm:w-10 shrink-0 flex items-center justify-center">
        {isActive && isPlaying ? (
          <span className="flex gap-[2px] items-end h-4">
            {[1, 2, 3].map((b) => (
              <span
                key={b}
                className="w-[3px] bg-[#f91fc3] rounded-full"
                style={{
                  height: `${35 + b * 20}%`,
                  animation: `equalize 0.8s ease-in-out ${b * 0.15}s infinite alternate`,
                }}
              />
            ))}
          </span>
        ) : (
          <span
            className="font-black tabular-nums text-lg sm:text-xl"
            style={{ color: rank <= 3 ? accent.ring : "rgba(255,255,255,0.25)" }}
          >
            {rank}
          </span>
        )}
      </div>

      {/* Artwork */}
      <div
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0"
        style={rank <= 3 ? { boxShadow: `0 0 0 2px ${accent.ring}, 0 0 16px ${accent.glow}` } : undefined}
      >
        <Image
          src={imgSrc || track.artwork}
          alt={track.title}
          fill
          sizes="56px"
          className="object-cover"
          unoptimized
          onError={() => setImgSrc("/images/placeholder.jpg")}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
          <RiPlayFill
            size={20}
            className={`text-white transition ${hover && !isActive ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>

      {/* Title + artist */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isActive ? "text-[#f91fc3]" : "text-white"}`}>
          {track.title}
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); onArtist(); }}
          className="text-xs text-white/45 hover:text-[#f91fc3] transition truncate max-w-full text-left"
        >
          {track.artist}
        </button>
      </div>

      {/* Genre (md+) */}
      {track.genre && (
        <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-[#f91fc3]/55 border border-[#f91fc3]/20 rounded-full px-3 py-1 shrink-0">
          {track.genre}
        </span>
      )}

      {/* Plays (sm+) */}
      <span className="hidden sm:flex items-center gap-1.5 text-xs text-white/40 font-mono shrink-0 w-16 justify-end">
        <span className="text-white/30">▶</span>
        {formatNumber(track.plays)}
      </span>

      {/* Likes */}
      <span className="flex items-center gap-1.5 text-xs text-[#f91fc3]/70 font-mono shrink-0 w-14 justify-end">
        <FaHeart size={10} />
        {formatNumber(track.likes)}
      </span>
    </motion.div>
  );
}

/* ── skeleton ────────────────────────────────────────── */
function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3">
          <GlowSkeleton className="w-8 h-6 rounded-md" />
          <GlowSkeleton className="w-14 h-14 rounded-xl shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <GlowSkeleton className="w-1/2 h-4 rounded-lg" />
            <GlowSkeleton className="w-1/3 h-3 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── main view ───────────────────────────────────────── */
export default function UndergroundTrendingChart() {
  const { data, isLoading, error } = useUndergroundTrendingTracks();
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const setView = useUIStore((s) => s.setView);
  const setSelectedArtist = useUIStore((s) => s.setSelectedArtist);

  const tracks = data ? data.map(mapTrackToUI) : [];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 h-full overflow-y-auto overflow-x-hidden pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setView("home")}
          className="flex items-center gap-2 text-white/40 hover:text-white/70 transition w-fit"
        >
          <HiChevronLeft size={20} /> Back to Home
        </button>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#f91fc3]/10 border border-[#f91fc3]/30 flex items-center justify-center shadow-[0_0_24px_rgba(249,31,195,0.35)] shrink-0">
            <IoFlameOutline className="text-2xl text-[#f91fc3]" />
          </div>
          <div className="relative pl-5">
            <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-white uppercase">Underground Chart</h1>
            <p className="text-sm text-white/40 mt-0.5">Rising sounds, ranked by momentum</p>
          </div>
        </div>
      </div>

      {/* Body */}
      {isLoading ? (
        <ChartSkeleton />
      ) : error || tracks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-white/40">
          <IoFlameOutline className="text-5xl opacity-30" />
          <p className="text-lg">The chart is unavailable right now</p>
          <p className="text-sm text-white/25">Try again in a moment</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {tracks.map((track, i) => (
            <ChartRow
              key={track.id}
              rank={i + 1}
              track={track}
              isActive={currentTrack?.trackId === track.id}
              isPlaying={isPlaying && currentTrack?.trackId === track.id}
              onPlay={() => handlePlay(track.id, track.title, track.artist, play)}
              onArtist={() => {
                if (track.artistHandle && track.artistId) {
                  setSelectedArtist(track.artistHandle, track.artistId);
                  setView("artist");
                }
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes equalize {
          from { transform: scaleY(0.3); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
