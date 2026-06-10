"use client";

import Image from "next/image";
import { usePlayerStore } from "@/stores/playerStore";
import { useUIStore } from "@/stores/uiStore";
import WaveProgress from "@/shared/components/ui/ProgressBar/WaveProgress";
import { TrackInfoSkeleton } from "@/shared/components/ui/Skeletons/TrackInfoSkeleton";
import { DotsGlowLoader } from "@/shared/components/ui/Loaders/DotsGlowLoader";
import { handlePlay } from "@/lib/functions/handlePlay";
import { handleNext } from "@/lib/functions/handleNext";
import { handlePrev } from "@/lib/functions/handlePrev";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSpeakerWave,
  HiSpeakerXMark,
  HiHeart,
  HiOutlineHeart,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import { TbRepeat, TbRepeatOnce, TbArrowsShuffle } from "react-icons/tb";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { RiPlayFill, RiPauseFill } from "react-icons/ri";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function TrackPanel() {
  const trackData    = usePlayerStore((s) => s.trackData);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying    = usePlayerStore((s) => s.isPlaying);
  const isLoading    = usePlayerStore((s) => s.isLoading);
  const isPlaylist   = usePlayerStore((s) => s.isPlaylist);
  const shuffle      = usePlayerStore((s) => s.shuffle);
  const repeat       = usePlayerStore((s) => s.repeat);
  const volume       = usePlayerStore((s) => s.volume);
  const currentTime  = usePlayerStore((s) => s.currentTime);
  const duration     = usePlayerStore((s) => s.duration);
  const likedTracks  = usePlayerStore((s) => s.likedTracks);
  const play         = usePlayerStore((s) => s.play);
  const toggle       = usePlayerStore((s) => s.toggle);
  const setVolume    = usePlayerStore((s) => s.setVolume);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const toggleRepeat  = usePlayerStore((s) => s.toggleRepeat);
  const toggleLike    = usePlayerStore((s) => s.toggleLike);
  const initializeLikes = usePlayerStore((s) => s.initializeLikes);

  const currentPlaylistTitle = usePlayerStore((s) => s.currentPlaylist?.title ?? "");
  const setSelectedArtist = useUIStore((s) => s.setSelectedArtist);
  const setView           = useUIStore((s) => s.setView);

  const [wavesReady, setWavesReady] = useState(false);
  const [imgSrc, setImgSrc]         = useState<string | null>(null);

  useEffect(() => { initializeLikes(); }, [initializeLikes]);

  const isLoaded   = !!currentTrack?.url && currentTrack.trackId === trackData?.id;
  const trackId    = trackData?.id ?? "";
  const isLiked    = likedTracks.has(trackId);
  const artwork    = imgSrc ?? trackData?.artwork?.["480x480"] ?? trackData?.artwork?.["150x150"] ?? "/images/placeholder.jpg";
  const artistId   = trackData?.user?.id ?? "";
  const artistHandle = trackData?.user?.handle ?? "";

  const handleTogglePlay = () => {
    if (!trackData) return;
    if (isLoaded) toggle();
    else handlePlay(trackData.id, trackData.title, trackData.user.name, play);
  };

  const handleArtistClick = () => {
    if (!artistHandle || !artistId) return;
    setSelectedArtist(artistHandle, artistId);
    setView("artist");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); handleTogglePlay(); }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        const audio = document.querySelector("audio") as HTMLAudioElement;
        if (audio) audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        const audio = document.querySelector("audio") as HTMLAudioElement;
        if (audio) audio.currentTime = Math.max(audio.currentTime - 5, 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLoaded, isPlaying, trackData]);

  if (!trackData) return <TrackInfoSkeleton />;

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">

      {/* ── Header ────────────────────────────────── */}
      <div className="relative pl-5">
        <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
        <h1 className="text-xl font-bold tracking-wide text-white uppercase">Now Playing</h1>
        <p className="text-sm text-white/40 mt-0.5">
          {isPlaylist ? `From playlist · ${currentPlaylistTitle}` : "Single track"}
        </p>
      </div>

      {/* ── Artwork + Meta card ───────────────────── */}
      <div className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 rounded-3xl p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)]">
        <div className="flex gap-6 items-start">

          {/* Cover */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack?.trackId ?? "art"}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-44 h-44 rounded-2xl overflow-hidden shrink-0"
              style={{ boxShadow: "0 8px 40px rgba(249,31,195,0.25), 0 0 0 1px rgba(249,31,195,0.1)" }}
            >
              <Image
                src={artwork}
                alt={trackData.title}
                fill
                sizes="176px"
                className="object-cover"
                priority
                onError={() => setImgSrc("/images/placeholder.jpg")}
              />
            </motion.div>
          </AnimatePresence>

          {/* Meta */}
          <div className="flex-1 min-w-0 flex flex-col gap-3 pt-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack?.trackId ?? "meta"}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-1"
              >
                <h2 className="text-xl font-bold text-white leading-tight line-clamp-2" title={trackData.title}>
                  {trackData.title}
                </h2>
                <button
                  onClick={handleArtistClick}
                  disabled={!artistHandle}
                  className="text-sm text-white/50 hover:text-[#f91fc3] transition w-fit flex items-center gap-1 group"
                >
                  {trackData.user.name}
                  {artistHandle && (
                    <HiArrowTopRightOnSquare className="text-xs opacity-0 group-hover:opacity-60 transition" />
                  )}
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Stats */}
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <span className="text-white/50">▶</span>
                {fmt(trackData.play_count ?? 0)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <span className="text-[#f91fc3]/60">♥</span>
                {fmt(trackData.favorite_count ?? 0)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-white/30">
                <span className="text-white/50">↺</span>
                {fmt(trackData.repost_count ?? 0)}
              </span>
            </div>

            {/* Genre chip */}
            {trackData.genre && (
              <span className="text-[10px] font-semibold tracking-widest uppercase text-[#f91fc3]/60 border border-[#f91fc3]/20 rounded-full px-3 py-0.5 w-fit">
                {trackData.genre}
              </span>
            )}

            {/* Like action */}
            <button
              onClick={() => { if (trackId) toggleLike(trackId); }}
              className={`mt-auto flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full border transition w-fit ${
                isLiked
                  ? "bg-[#f91fc3]/15 border-[#f91fc3]/50 text-[#f91fc3]"
                  : "bg-white/5 border-white/10 text-white/50 hover:border-[#f91fc3]/40 hover:text-[#f91fc3]/80"
              }`}
            >
              {isLiked ? <HiHeart className="text-base" /> : <HiOutlineHeart className="text-base" />}
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Waveform + Time card ──────────────────── */}
      <div className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 rounded-3xl px-6 pt-5 pb-4 shadow-[0_0_40px_rgba(249,31,195,0.06)]">
        <div className="relative w-full mb-1">
          <AnimatePresence>
            {!wavesReady && (
              <motion.div
                key="wave-loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <DotsGlowLoader />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            animate={{ opacity: wavesReady ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <WaveProgress
              onReady={() => setWavesReady(true)}
              onReset={() => setWavesReady(false)}
            />
          </motion.div>
        </div>

        {/* Time row */}
        <div className="flex justify-between text-xs text-white/30 font-mono px-0.5 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* ── Controls card ─────────────────────────── */}
      <div className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 rounded-3xl px-6 py-5 shadow-[0_0_40px_rgba(249,31,195,0.06)]">

        {/* Main controls */}
        <div className="flex items-center justify-center gap-6 mb-5">

          {/* Shuffle */}
          <button
            onClick={toggleShuffle}
            title="Shuffle"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
              shuffle
                ? "text-[#f91fc3] bg-[#f91fc3]/10 border border-[#f91fc3]/30"
                : "text-white/30 hover:text-white/70 border border-transparent"
            }`}
          >
            <TbArrowsShuffle size={18} />
          </button>

          {/* Prev */}
          <button
            onClick={handlePrev}
            disabled={!isPlaylist}
            title="Previous"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition disabled:opacity-20 disabled:cursor-not-allowed border border-transparent"
          >
            <IoPlaySkipBack size={20} />
          </button>

          {/* Play / Pause */}
          <button
            onClick={handleTogglePlay}
            disabled={!trackData || isLoading}
            title={isPlaying ? "Pause" : "Play"}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed border-2 border-[#f91fc3] hover:bg-[#f91fc3]/10 active:scale-95"
            style={{ boxShadow: "0 0 24px rgba(249,31,195,0.35)" }}
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-[#f91fc3] border-t-transparent rounded-full animate-spin" />
            ) : isPlaying && isLoaded ? (
              <RiPauseFill size={24} className="text-[#f91fc3]" />
            ) : (
              <RiPlayFill size={24} className="text-[#f91fc3] ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            disabled={!isPlaylist}
            title="Next"
            className="w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition disabled:opacity-20 disabled:cursor-not-allowed border border-transparent"
          >
            <IoPlaySkipForward size={20} />
          </button>

          {/* Repeat */}
          <button
            onClick={toggleRepeat}
            title={repeat === "off" ? "Repeat off" : repeat === "one" ? "Repeat one" : "Repeat all"}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all relative ${
              repeat !== "off"
                ? "text-[#f91fc3] bg-[#f91fc3]/10 border border-[#f91fc3]/30"
                : "text-white/30 hover:text-white/70 border border-transparent"
            }`}
          >
            {repeat === "one" ? <TbRepeatOnce size={18} /> : <TbRepeat size={18} />}
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
            className="text-white/30 hover:text-white/70 transition shrink-0"
          >
            {volume === 0 ? <HiSpeakerXMark size={18} /> : <HiSpeakerWave size={18} />}
          </button>
          <div className="relative flex-1 h-1 group cursor-pointer">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <div
              className="absolute inset-y-0 left-0 bg-[#f91fc3] rounded-full transition-[width] duration-75"
              style={{ width: `${volume * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_rgba(249,31,195,0.6)]"
              style={{ left: `calc(${volume * 100}% - 6px)` }}
            />
          </div>
          <span className="text-xs text-white/30 font-mono w-7 text-right shrink-0">
            {Math.round(volume * 100)}
          </span>
        </div>

        {/* Keyboard hint */}
        <p className="text-center text-[10px] text-white/15 tracking-widest mt-4 select-none uppercase">
          Space · ← → seek 5s
        </p>
      </div>
    </div>
  );
}
