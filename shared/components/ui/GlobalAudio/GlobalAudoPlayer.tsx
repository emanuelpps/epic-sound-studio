"use client";

import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useRef } from "react";

export function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { currentTrack, isPlaying, volume } = usePlayerStore();

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  return <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />;
}
