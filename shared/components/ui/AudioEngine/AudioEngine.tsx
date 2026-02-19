"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/playerStore";

export function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentTrack, isPlaying, setProgress, setDuration, setCurrentTime } =
    usePlayerStore();

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying, currentTrack]);

  return (
    <audio
      ref={audioRef}
      src={currentTrack?.url}
      onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      onTimeUpdate={(e) => {
        const audio = e.currentTarget;
        const p = (audio.currentTime / audio.duration) * 100;
        setCurrentTime(audio.currentTime);
        setProgress(p || 0);
      }}
    />
  );
}
