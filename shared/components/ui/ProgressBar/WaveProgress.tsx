"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/stores/playerStore";
import WaveLoading from "../Loaders/WaveLoading";

export default function WaveProgress() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isReady, setIsReady] = useState(false);

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

    ws.on("ready", () => {
      setIsReady(true);
    });

    waveSurferRef.current = ws;

    return () => {
      ws.destroy();
    };
  }, [audio, currentTrack]);

  return (
    <div className="relative w-full h-20">
      {!isReady && <WaveLoading />}
      <div
        ref={containerRef}
        className={`w-full transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
