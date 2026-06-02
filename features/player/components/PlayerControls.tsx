"use client";

import { handlePlay } from "@/lib/functions/handlePlay";
import { handleNext } from "@/lib/functions/handleNext";
import { handlePrev } from "@/lib/functions/handlePrev";
import BackIcon from "@/shared/components/ui/Icons/Back";
import NextIcon from "@/shared/components/ui/Icons/Next";
import PlayIcon from "@/shared/components/ui/Icons/Play";
import PauseIcon from "@/shared/components/ui/Icons/Pause";
import RandomIcon from "@/shared/components/ui/Icons/Random";
import RepeatIcon from "@/shared/components/ui/Icons/Repeat";
import { usePlayerStore } from "@/stores/playerStore";
import { useEffect } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

export default function PlayerControls() {
  const trackData = usePlayerStore((s) => s.trackData);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isLoading = usePlayerStore((s) => s.isLoading);
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);
  const shuffle = usePlayerStore((s) => s.shuffle);
  const repeat = usePlayerStore((s) => s.repeat);
  const volume = usePlayerStore((s) => s.volume);
  const play = usePlayerStore((s) => s.play);
  const toggle = usePlayerStore((s) => s.toggle);
  const setVolume = usePlayerStore((s) => s.setVolume);
  const toggleShuffle = usePlayerStore((s) => s.toggleShuffle);
  const toggleRepeat = usePlayerStore((s) => s.toggleRepeat);

  const isLoaded =
    !!currentTrack?.url && currentTrack.trackId === trackData?.id;

  const handleTogglePlay = () => {
    if (!trackData) return;
    if (isLoaded) {
      toggle();
    } else {
      handlePlay(trackData.id, trackData.title, trackData.user.name, play);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.code === "Space") {
        e.preventDefault();
        handleTogglePlay();
      }
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

  const repeatLabel = repeat === "off" ? "Repeat off" : repeat === "one" ? "Repeat one" : "Repeat all";

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      {/* Main controls */}
      <div className="flex items-center justify-between w-full max-w-[400px]">
        {/* Shuffle */}
        <button
          onClick={toggleShuffle}
          title="Shuffle"
          className={`text-lg transition-all ${
            shuffle
              ? "text-[#f91fc3] drop-shadow-[0_0_8px_#f91fc3]"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <RandomIcon />
        </button>

        {/* Back */}
        <button
          onClick={handlePrev}
          disabled={!isPlaylist}
          title="Previous"
          className="text-xl text-gray-400 hover:text-white transition disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <BackIcon />
        </button>

        {/* Play / Pause */}
        <button
          onClick={handleTogglePlay}
          disabled={!trackData || isLoading}
          title={isPlaying ? "Pause" : "Play"}
          className="w-[72px] h-[72px] rounded-full bg-white text-black flex items-center justify-center text-xl shadow-[0_0_32px_rgba(255,0,255,0.45)] hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : isPlaying && isLoaded ? (
            <PauseIcon />
          ) : (
            <PlayIcon className="ml-0.5" />
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={!isPlaylist}
          title="Next"
          className="text-xl text-gray-400 hover:text-white transition disabled:opacity-25 disabled:cursor-not-allowed"
        >
          <NextIcon />
        </button>

        {/* Repeat */}
        <button
          onClick={toggleRepeat}
          title={repeatLabel}
          className={`text-lg transition-all relative ${
            repeat !== "off"
              ? "text-[#f91fc3] drop-shadow-[0_0_8px_#f91fc3]"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <RepeatIcon />
          {repeat === "one" && (
            <span className="absolute -top-1.5 -right-1.5 text-[7px] font-bold bg-[#f91fc3] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
              1
            </span>
          )}
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-full max-w-[300px]">
        <button
          onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
          title={volume === 0 ? "Unmute" : "Mute"}
          className="text-gray-400 hover:text-white transition text-base shrink-0"
        >
          {volume === 0 ? <HiSpeakerXMark /> : <HiSpeakerWave />}
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
            style={{ width: `${volume * 100}%`, boxShadow: "0 0 6px rgba(249,31,195,0.5)" }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${volume * 100}% - 6px)` }}
          />
        </div>
        <span className="text-xs text-gray-500 font-mono w-6 text-right shrink-0">
          {Math.round(volume * 100)}
        </span>
      </div>

      {/* Keyboard hint */}
      <p className="text-[10px] text-gray-600 tracking-widest select-none">
        SPACE · ← → SEEK 5s
      </p>
    </div>
  );
}
