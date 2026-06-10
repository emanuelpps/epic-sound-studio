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
  HiSpeakerWave, HiSpeakerXMark,
  HiHeart, HiOutlineHeart,
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
  const currentPlaylistTitle = usePlayerStore((s) => s.currentPlaylist?.title ?? "");

  const play          = usePlayerStore((s) => s.play);
  const toggle        = usePlayerStore((s) => s.toggle);
  const setVolume     = usePlayerStore((s) => s.setVolume);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const toggleRepeat  = usePlayerStore((s) => s.toggleRepeat);
  const toggleLike    = usePlayerStore((s) => s.toggleLike);
  const initializeLikes = usePlayerStore((s) => s.initializeLikes);

  const setSelectedArtist = useUIStore((s) => s.setSelectedArtist);
  const setView           = useUIStore((s) => s.setView);

  const [wavesReady, setWavesReady] = useState(false);
  const [imgSrc, setImgSrc]         = useState<string | null>(null);

  useEffect(() => { initializeLikes(); }, [initializeLikes]);

  const isLoaded     = !!currentTrack?.url && currentTrack.trackId === trackData?.id;
  const trackId      = trackData?.id ?? "";
  const isLiked      = likedTracks.has(trackId);
  const artwork      = imgSrc ?? trackData?.artwork?.["480x480"] ?? trackData?.artwork?.["150x150"] ?? "/images/placeholder.jpg";
  const artistHandle = trackData?.user?.handle ?? "";
  const artistId     = trackData?.user?.id ?? "";

  const handleTogglePlay = () => {
    if (!trackData) return;
    if (isLoaded) toggle();
    else handlePlay(trackData.id, trackData.title, trackData.user.name, play);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") { e.preventDefault(); handleTogglePlay(); }
      if (e.code === "ArrowRight") {
        e.preventDefault();
        const a = document.querySelector("audio") as HTMLAudioElement;
        if (a) a.currentTime = Math.min(a.currentTime + 5, a.duration);
      }
      if (e.code === "ArrowLeft") {
        e.preventDefault();
        const a = document.querySelector("audio") as HTMLAudioElement;
        if (a) a.currentTime = Math.max(a.currentTime - 5, 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLoaded, isPlaying, trackData]);

  if (!trackData) return <TrackInfoSkeleton />;

  return (
    <div className="h-full flex flex-col gap-4 w-full">

      {/* ── Page header ────────────────────────────── */}
      <div className="relative pl-5 shrink-0">
        <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
        <h1 className="text-xl font-bold tracking-wide text-white uppercase">Now Playing</h1>
        <p className="text-sm text-white/40 mt-0.5">
          {isPlaylist ? `From playlist · ${currentPlaylistTitle}` : "Single track"}
        </p>
      </div>

      {/* ── Single unified player card ─────────────── */}
      <div className="flex-1 min-h-0 flex flex-col bg-[#120914]/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(249,31,195,0.08)]">

        {/* Top: artwork + meta — fills all available space */}
        <div
          className="flex-1 min-h-0 flex gap-8 items-center"
          style={{ padding: isPlaylist ? "20px 24px" : "28px 32px" }}
        >

          {/* Cover — stretches to fill section height, capped at max */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack?.trackId ?? "art"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                alignSelf: "stretch",
                aspectRatio: "1 / 1",
                maxHeight: isPlaylist ? 200 : 280,
                maxWidth: isPlaylist ? 200 : 280,
                boxShadow: "0 16px 64px rgba(249,31,195,0.35), 0 0 0 1px rgba(249,31,195,0.12)",
              }}
            >
              <Image
                src={artwork}
                alt={trackData.title}
                fill
                sizes="280px"
                className="object-cover"
                priority
                onError={() => setImgSrc("/images/placeholder.jpg")}
              />
            </motion.div>
          </AnimatePresence>

          {/* Meta ─────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack?.trackId ?? "meta"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-1 min-w-0 flex flex-col justify-center"
              style={{ gap: isPlaylist ? "12px" : "16px" }}
            >
              <div>
                <h2
                  className="font-bold text-white leading-[1.1] line-clamp-2 mb-2"
                  style={{ fontSize: isPlaylist ? "1.4rem" : "2.5rem" }}
                  title={trackData.title}
                >
                  {trackData.title}
                </h2>
                <button
                  onClick={() => {
                    if (artistHandle && artistId) {
                      setSelectedArtist(artistHandle, artistId);
                      setView("artist");
                    }
                  }}
                  disabled={!artistHandle}
                  className="text-white/50 hover:text-[#f91fc3] transition w-fit flex items-center gap-1.5 group disabled:pointer-events-none"
                  style={{ fontSize: isPlaylist ? "0.875rem" : "1.1rem" }}
                >
                  {trackData.user.name}
                  {artistHandle && (
                    <HiArrowTopRightOnSquare
                      className="opacity-0 group-hover:opacity-60 transition"
                      size={isPlaylist ? 12 : 14}
                    />
                  )}
                </button>
              </div>

              {/* Description (single track only, if available) */}
              {!isPlaylist && trackData.description && (
                <p className="text-sm text-white/30 line-clamp-2 leading-relaxed max-w-2xl">
                  {trackData.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex gap-5">
                <span className="flex items-center gap-1.5 text-white/35" style={{ fontSize: isPlaylist ? "11px" : "13px" }}>
                  <span className="text-white/50" style={{ fontSize: isPlaylist ? "9px" : "11px" }}>▶</span>
                  {fmt(trackData.play_count ?? 0)}
                </span>
                <span className="flex items-center gap-1.5 text-white/35" style={{ fontSize: isPlaylist ? "11px" : "13px" }}>
                  <span className="text-[#f91fc3]/60" style={{ fontSize: isPlaylist ? "9px" : "11px" }}>♥</span>
                  {fmt(trackData.favorite_count ?? 0)}
                </span>
                <span className="flex items-center gap-1.5 text-white/35" style={{ fontSize: isPlaylist ? "11px" : "13px" }}>
                  <span className="text-white/50" style={{ fontSize: isPlaylist ? "9px" : "11px" }}>↺</span>
                  {fmt(trackData.repost_count ?? 0)}
                </span>
              </div>

              {/* Genre + Like row */}
              <div className="flex items-center gap-3 flex-wrap">
                {trackData.genre && (
                  <span
                    className="font-semibold tracking-widest uppercase text-[#f91fc3]/60 border border-[#f91fc3]/20 rounded-full px-3 py-1"
                    style={{ fontSize: isPlaylist ? "9px" : "11px" }}
                  >
                    {trackData.genre}
                  </span>
                )}
                <button
                  onClick={() => { if (trackId) toggleLike(trackId); }}
                  className={`flex items-center gap-1.5 font-medium rounded-full border transition ${
                    isPlaylist ? "text-xs px-3 py-1" : "text-sm px-4 py-1.5"
                  } ${
                    isLiked
                      ? "bg-[#f91fc3]/15 border-[#f91fc3]/50 text-[#f91fc3]"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-[#f91fc3]/40 hover:text-[#f91fc3]/70"
                  }`}
                >
                  {isLiked ? <HiHeart size={isPlaylist ? 12 : 14} /> : <HiOutlineHeart size={isPlaylist ? 12 : 14} />}
                  {isLiked ? "Liked" : "Like"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Separator */}
        <div className="shrink-0 h-px bg-white/[0.06]" style={{ marginInline: isPlaylist ? "24px" : "32px" }} />

        {/* Waveform + time ───────────────────────── */}
        <div className="shrink-0 pt-5 pb-2" style={{ paddingInline: isPlaylist ? "24px" : "32px" }}>
          <div className="relative">
            <AnimatePresence>
              {!wavesReady && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <DotsGlowLoader />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div animate={{ opacity: wavesReady ? 1 : 0 }} transition={{ duration: 0.35 }}>
              <WaveProgress
                onReady={() => setWavesReady(true)}
                onReset={() => setWavesReady(false)}
              />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-white/25 font-mono mt-1.5 px-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Separator */}
        <div className="shrink-0 h-px bg-white/[0.06] mt-3" style={{ marginInline: isPlaylist ? "24px" : "32px" }} />

        {/* Controls ─────────────────────────────── */}
        <div className="shrink-0 pt-4 pb-5 flex flex-col gap-4" style={{ paddingInline: isPlaylist ? "24px" : "32px" }}>

          {/* Main row */}
          <div className="flex items-center justify-center gap-6">

            <button
              onClick={toggleShuffle}
              title="Shuffle"
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                shuffle
                  ? "text-[#f91fc3] bg-[#f91fc3]/10 border border-[#f91fc3]/30"
                  : "text-white/25 hover:text-white/60 border border-transparent hover:bg-white/5"
              }`}
            >
              <TbArrowsShuffle size={18} />
            </button>

            <button
              onClick={handlePrev}
              disabled={!isPlaylist}
              title="Previous"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/5 transition disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <IoPlaySkipBack size={22} />
            </button>

            {/* Play/Pause — main CTA */}
            <button
              onClick={handleTogglePlay}
              disabled={!trackData || isLoading}
              title={isPlaying ? "Pause" : "Play"}
              className="w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 bg-[#f91fc3] hover:bg-[#ff3fd0]"
              style={{ boxShadow: "0 0 32px rgba(249,31,195,0.5), 0 4px 16px rgba(0,0,0,0.4)" }}
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying && isLoaded ? (
                <RiPauseFill size={26} className="text-white" />
              ) : (
                <RiPlayFill size={26} className="text-white ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={!isPlaylist}
              title="Next"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/5 transition disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <IoPlaySkipForward size={22} />
            </button>

            <button
              onClick={toggleRepeat}
              title={repeat === "off" ? "Repeat off" : repeat === "one" ? "Repeat one" : "Repeat all"}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                repeat !== "off"
                  ? "text-[#f91fc3] bg-[#f91fc3]/10 border border-[#f91fc3]/30"
                  : "text-white/25 hover:text-white/60 border border-transparent hover:bg-white/5"
              }`}
            >
              {repeat === "one" ? <TbRepeatOnce size={18} /> : <TbRepeat size={18} />}
            </button>
          </div>

          {/* Volume row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="text-white/25 hover:text-white/60 transition shrink-0"
            >
              {volume === 0 ? <HiSpeakerXMark size={17} /> : <HiSpeakerWave size={17} />}
            </button>
            <div className="relative flex-1 h-1 group cursor-pointer">
              <input
                type="range" min="0" max="1" step="0.01" value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 bg-white/10 rounded-full" />
              <div
                className="absolute inset-y-0 left-0 bg-[#f91fc3] rounded-full transition-[width] duration-75"
                style={{ width: `${volume * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(249,31,195,0.7)]"
                style={{ left: `calc(${volume * 100}% - 6px)` }}
              />
            </div>
            <span className="text-[11px] text-white/25 font-mono w-7 text-right shrink-0">
              {Math.round(volume * 100)}
            </span>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-[10px] text-white/15 tracking-widest select-none uppercase -mb-1">
            Space · ← → seek 5s
          </p>
        </div>
      </div>
    </div>
  );
}
