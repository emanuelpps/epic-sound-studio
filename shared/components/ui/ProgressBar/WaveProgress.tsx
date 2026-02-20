"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/stores/playerStore";

export default function WaveProgress() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const audio = usePlayerStore((s) => s.audioRef);
  const { currentTrack } = usePlayerStore();

  useEffect(() => {
    if (!containerRef.current || !audio) return;

    if (waveSurferRef.current) {
      waveSurferRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#1a0028",
      progressColor: "#f91fc3",
      cursorColor: "transparent",
      barWidth: 3,
      barGap: 2,
      barRadius: 4,
      height: 80,
      backend: "MediaElement",
      media: audio,
    });

    waveSurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audio, currentTrack]);

  return <div ref={containerRef} className="w-full" />;
}
