"use client";

import { useUIStore } from "@/stores/uiStore";
import { usePlayerStore, Track } from "@/stores/playerStore";
import { usePlaylistDetail } from "@/queries/usePlaylistDetail";
import { usePlaylistTracks } from "@/queries/usePlaylistTracks";
import { GlowSkeleton } from "@/shared/components/ui/Skeletons/GlowSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { handlePlay } from "@/lib/functions/handlePlay";
import { HiChevronLeft, HiCheckBadge } from "react-icons/hi2";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import { TbVinyl } from "react-icons/tb";
import Image from "next/image";
import { useState } from "react";
import type { UiTrack } from "@/services/tracks/types";

/* ── helpers ─────────────────────────────────────────── */
function fmt(n: number) {
  if (!n) return "0";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
function fmtTime(s: number) {
  if (!s || isNaN(s)) return "";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/* ── skeleton ─────────────────────────────────────────── */
function PlaylistSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <GlowSkeleton className="w-24 h-4 rounded-full" />
      <div className="rounded-3xl overflow-hidden bg-[#120914]/60 p-8">
        <div className="flex gap-8 items-end">
          <GlowSkeleton className="w-52 h-52 rounded-2xl shrink-0" />
          <div className="flex-1 flex flex-col gap-4 pb-2">
            <GlowSkeleton className="w-24 h-3 rounded-full" />
            <GlowSkeleton className="w-3/4 h-10 rounded-xl" />
            <GlowSkeleton className="w-1/3 h-4 rounded-full" />
            <GlowSkeleton className="w-2/3 h-3 rounded-full" />
            <GlowSkeleton className="w-1/4 h-3 rounded-full" />
            <GlowSkeleton className="w-32 h-10 rounded-full mt-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <GlowSkeleton key={i} className={`w-full h-14 rounded-xl`} />
        ))}
      </div>
    </div>
  );
}

/* ── track row ─────────────────────────────────────────── */
function TrackRow({
  track,
  index,
  isActive,
  isPlaying,
  onPlay,
}: {
  track: UiTrack;
  index: number;
  isActive: boolean;
  isPlaying: boolean;
  onPlay: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      onClick={onPlay}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.4) }}
      className={`group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left ${
        isActive
          ? "bg-[#f91fc3]/10 border border-[#f91fc3]/20"
          : "border border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]"
      }`}
    >
      {/* Index / equalizer */}
      <div className="w-7 flex items-center justify-center shrink-0">
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
        ) : hover ? (
          <RiPlayFill size={16} className="text-[#f91fc3]" />
        ) : (
          <span className={`text-sm font-mono ${isActive ? "text-[#f91fc3]" : "text-white/30"}`}>
            {index}
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
        {track.artwork ? (
          <Image src={track.artwork} alt={track.title} fill sizes="40px" className="object-cover" />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center">
            <TbVinyl size={16} className="text-white/20" />
          </div>
        )}
        {isActive && (
          <div className="absolute inset-0 bg-[#f91fc3]/20" />
        )}
      </div>

      {/* Title + artist */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? "text-[#f91fc3]" : "text-white/90 group-hover:text-white"}`}>
          {track.title}
        </p>
        <p className="text-xs text-white/40 truncate">{track.artist}</p>
      </div>

      {/* Duration */}
      {track.duration > 0 && (
        <span className="text-xs font-mono text-white/25 shrink-0">{fmtTime(track.duration)}</span>
      )}
    </motion.button>
  );
}

/* ── main view ─────────────────────────────────────────── */
export default function PlaylistView() {
  const selectedPlaylistId = useUIStore((s) => s.selectedPlaylistId);
  const setView             = useUIStore((s) => s.setView);
  const setSelectedPlaylistId = useUIStore((s) => s.setSelectedPlaylistId);

  const currentTrack        = usePlayerStore((s) => s.currentTrack);
  const isPlaying           = usePlayerStore((s) => s.isPlaying);
  const play                = usePlayerStore((s) => s.play);
  const setCurrentPlaylist  = usePlayerStore((s) => s.setCurrentPlaylist);

  const { data: playlist, isLoading: plLoading, error: plError } = usePlaylistDetail(selectedPlaylistId);
  const { data: tracks,   isLoading: trLoading, error: trError } = usePlaylistTracks(selectedPlaylistId);

  const [coverSrc, setCoverSrc] = useState<string | null>(null);

  const loading = plLoading || trLoading;
  const hasError = !!plError || !!trError;

  const handleBack = () => {
    setSelectedPlaylistId(null);
    setView("home");
  };

  const handlePlayAll = () => {
    if (!playlist || !tracks || tracks.length === 0) return;

    const storeTracks: Track[] = tracks.map((t) => ({
      trackId: t.id,
      title: t.title,
      artist: t.artist,
      url: "",
      cover: t.artwork,
      artwork: t.artwork,
      description: t.description ?? "",
      genre: t.genre,
      duration: t.duration,
      plays: t.plays,
      likes: t.likes,
      reposts: 0,
    }));

    setCurrentPlaylist({ ...playlist, tracks: storeTracks });
    handlePlay(tracks[0].id, tracks[0].title, tracks[0].artist, play);
    setView("player");
  };

  if (!selectedPlaylistId) {
    handleBack();
    return null;
  }

  /* ── loading state ─── */
  if (loading) {
    return (
      <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(249,31,195,0.15) transparent" }}>
        <PlaylistSkeleton />
      </div>
    );
  }

  /* ── error state ─── */
  if (hasError || !playlist) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-white/40">
        <TbVinyl size={48} className="opacity-30" />
        <p className="text-sm">Could not load playlist</p>
        <button onClick={handleBack} className="text-xs text-[#f91fc3]/60 hover:text-[#f91fc3] transition flex items-center gap-1">
          <HiChevronLeft size={14} /> Back to Home
        </button>
      </div>
    );
  }

  const cover = coverSrc ?? playlist.cover;
  const trackCount = tracks?.length ?? 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedPlaylistId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="h-full overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(249,31,195,0.15) transparent" }}
      >
        <div className="p-6 flex flex-col gap-6">

          {/* ── Back button ─── */}
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition w-fit group"
          >
            <HiChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </motion.button>

          {/* ── Hero card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: "rgba(12, 5, 14, 0.85)" }}
          >
            {/* Blurred artwork bg */}
            {cover && cover !== "/images/placeholder.jpg" && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cover}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: "blur(60px)", transform: "scale(1.4)", opacity: 0.22 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c050e]/90 via-[#0c050e]/60 to-[#0c050e]/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c050e]/80 to-transparent" />
              </div>
            )}

            {/* Hero content */}
            <div className="relative z-10 p-8 flex gap-8 items-end flex-wrap">

              {/* Artwork */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="relative w-52 h-52 rounded-2xl overflow-hidden shrink-0"
                style={{ boxShadow: "0 20px 80px rgba(249,31,195,0.4), 0 0 0 1px rgba(249,31,195,0.15)" }}
              >
                <Image
                  src={cover}
                  alt={playlist.title}
                  fill
                  sizes="208px"
                  className="object-cover"
                  priority
                  unoptimized
                  onError={() => setCoverSrc("/images/placeholder.jpg")}
                />
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex-1 min-w-0 flex flex-col gap-3 pb-1"
              >
                {/* Type badge */}
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#f91fc3]/60">
                  {playlist.isAlbum ? "Album" : "Playlist"} · {trackCount} tracks
                </span>

                {/* Title */}
                <h1
                  className="font-bold text-white leading-[1.05] line-clamp-2"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                >
                  {playlist.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/50">by</span>
                  <span className="text-sm font-semibold text-white/80">{playlist.author}</span>
                  {playlist.isVerified && (
                    <HiCheckBadge size={16} className="text-[#f91fc3] shrink-0" />
                  )}
                </div>

                {/* Description */}
                {playlist.description && (
                  <p className="text-xs text-white/35 line-clamp-2 leading-relaxed max-w-lg">
                    {playlist.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex gap-5">
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <span className="text-[#f91fc3]/50 text-[10px]">♥</span>
                    {fmt(playlist.likes)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <span className="text-white/40 text-[10px]">▶</span>
                    {fmt(playlist.plays)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-white/30">
                    <span className="text-white/40 text-[10px]">↺</span>
                    {fmt(playlist.reposts)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={handlePlayAll}
                    disabled={!tracks || tracks.length === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 hover:brightness-110"
                    style={{
                      background: "#f91fc3",
                      boxShadow: "0 0 24px rgba(249,31,195,0.5), 0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    <RiPlayFill size={18} />
                    Play All
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Track list ─── */}
          {tracks && tracks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-2"
            >
              {/* Section header */}
              <div className="relative pl-5 mb-2">
                <span className="absolute left-0 top-1 bottom-1 w-[4px] rounded-full bg-[#f91fc3] shadow-[0_0_10px_rgba(249,31,195,0.9)]" />
                <h2 className="text-base font-bold tracking-wide text-white uppercase">Tracks</h2>
                <p className="text-xs text-white/35 mt-0.5">{trackCount} songs</p>
              </div>

              {/* Column headers */}
              <div className="flex items-center gap-4 px-4 pb-1 border-b border-white/[0.05]">
                <span className="w-7 text-center text-[10px] text-white/20 font-mono">#</span>
                <span className="w-10 shrink-0" />
                <span className="flex-1 text-[10px] text-white/20 uppercase tracking-widest">Title</span>
                <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Time</span>
              </div>

              {/* Rows */}
              <div className="flex flex-col">
                {tracks.map((track, i) => (
                  <TrackRow
                    key={track.id}
                    track={track}
                    index={i + 1}
                    isActive={currentTrack?.trackId === track.id}
                    isPlaying={isPlaying && currentTrack?.trackId === track.id}
                    onPlay={() => handlePlay(track.id, track.title, track.artist, play)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Empty tracks state */}
          {tracks && tracks.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-white/25">
              <TbVinyl size={40} className="opacity-40" />
              <p className="text-sm">No tracks available for this playlist</p>
            </div>
          )}

        </div>

        {/* Equalizer keyframe */}
        <style>{`
          @keyframes equalize {
            from { transform: scaleY(0.3); }
            to   { transform: scaleY(1); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
