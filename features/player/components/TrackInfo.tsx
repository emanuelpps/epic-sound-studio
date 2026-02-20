"use client";

import Image from "next/image";
import { usePlayerStore } from "@/stores/playerStore";
import WaveProgress from "@/shared/components/ui/ProgressBar/WaveProgress";
import PlayIcon from "@/shared/components/ui/Icons/Play";

export default function TrackInfo() {
  const trackData = usePlayerStore((s) => s.trackData);

  if (!trackData) {
    return (
      <div className="flex items-center justify-center h-[600px] text-gray-500">
        Select a track
      </div>
    );
  }

  const artwork =
    trackData.artwork?.["1000x1000"] ||
    trackData.artwork?.["480x480"] ||
    "/images/placeholder.jpg";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.4)] mb-8">
        <Image
          src={artwork}
          alt={trackData.title}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold tracking-wide mb-2">
        {trackData.title}
      </h1>
      <p className="text-gray-400 text-lg mb-6">{trackData.user.name}</p>
      <div className="flex gap-8 text-sm text-gray-400 mb-8">
        <span className="gap-2 flex justify-center items-center">
          <span>
            <PlayIcon />
          </span>
          {(trackData.play_count ?? 0).toLocaleString()}{" "}
          <span className="font-semibold text-cyan-400">PLAYS</span>
        </span>
        <span>♥ {(trackData.favorite_count ?? 0).toLocaleString()} LIKES</span>
        <span>↻ {(trackData.repost_count ?? 0).toLocaleString()} REPOSTS</span>
      </div>
      <div className="w-full flex justify-center items-center gap-2 h-20 mb-6">
        <WaveProgress />
      </div>
    </div>
  );
}
