"use client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { usePlayerStore } from "@/stores/playerStore";

interface WaveProgressProps {
  onReady?: () => void;
  onReset?: () => void;
}

export default function WaveProgress({ onReady, onReset }: WaveProgressProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const audio = usePlayerStore((s) => s.audioRef);
  const currentTrackId = usePlayerStore((s) => s.currentTrack?.trackId);

  // Create WaveSurfer once when the audio element is available
  useEffect(() => {
    if (!containerRef.current || !audio) return;

    waveSurferRef.current?.destroy();

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#1a0028",
      progressColor: "#f91fc3",
      cursorColor: "#7c4158",
      barWidth: 3,
      barGap: 3,
      barRadius: 4,
      height: 60,
      backend: "MediaElement",
      media: audio,
      interact: true,
    });

    ws.on("ready", () => onReady?.());

    waveSurferRef.current = ws;

    return () => {
      ws.destroy();
      waveSurferRef.current = null;
    };
  }, [audio]);

  // When track changes, signal the parent to show the loader again
  // WaveSurfer with MediaElement backend auto-reacts to audio src changes
  useEffect(() => {
    if (!waveSurferRef.current || !currentTrackId) return;
    onReset?.();

    const ws = waveSurferRef.current;
    const unsub = ws.on("ready", () => onReady?.());
    return () => unsub();
  }, [currentTrackId]);

  return <div ref={containerRef} className="w-full cursor-pointer" />;
}
