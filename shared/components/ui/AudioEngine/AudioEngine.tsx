"use client";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/stores/playerStore";
import { handleNext } from "@/lib/functions/handleNext";

export function AudioEngine() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    currentTrack,
    isPlaying,
    setProgress,
    setDuration,
    setCurrentTime,
    setIsLoading,
    volume,
    setAudioRef,
    repeat,
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) setAudioRef(audioRef.current);
  }, []);

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

  const handleEnded = () => {
    if (repeat === "one") {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play().catch(() => {});
      return;
    }
    if (repeat === "all" || usePlayerStore.getState().isPlaylist) {
      handleNext();
      return;
    }
    usePlayerStore.getState().toggle();
  };

  return (
    <audio
      ref={audioRef}
      src={currentTrack?.url}
      onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      onTimeUpdate={(e) => {
        const audio = e.currentTarget;
        const p = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        setCurrentTime(audio.currentTime);
        setProgress(p);
      }}
      onWaiting={() => setIsLoading(true)}
      onCanPlay={() => setIsLoading(false)}
      onEnded={handleEnded}
      onError={() => setIsLoading(false)}
    />
  );
}
