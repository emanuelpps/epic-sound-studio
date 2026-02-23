"use client";

import Image from "next/image";
import { usePlayerStore } from "@/stores/playerStore";
import WaveProgress from "@/shared/components/ui/ProgressBar/WaveProgress";
import PlayIcon from "@/shared/components/ui/Icons/Play";
import { useState } from "react";
import LikeFill from "@/shared/components/ui/Icons/LikeFill";
import RepostIcon from "@/shared/components/ui/Icons/Repost";

export default function TrackInfo() {
  const trackData = usePlayerStore((s) => s.trackData);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

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
      <div className="relative w-[320px] h-[320px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,255,0.4)] mb-8">
        <Image
          src={imgSrc || artwork}
          alt={trackData.title}
          fill
          sizes="100%"
          className="object-cover"
          onError={() => setImgSrc("/images/placeholder.jpg")}
        />
        {imgSrc && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent">
            <p className="absolute left-0 right-0 text-center text-white bottom-4">
              No Cover Loaded
            </p>
          </div>
        )}
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-wide">
        {trackData.title}
      </h1>
      <p className="mb-6 text-lg text-gray-400">{trackData.user.name}</p>
      <div className="flex gap-8 mb-8 text-sm text-gray-400">
        <span className="flex items-center justify-center gap-2">
          <span>
            <PlayIcon />
          </span>
          {(trackData.play_count ?? 0).toLocaleString()}{" "}
          <span className="font-semibold text-cyan-400">PLAYS</span>
        </span>
        <span className="flex items-center justify-center gap-2">
          <span>
            <LikeFill />
          </span>
          {(trackData.favorite_count ?? 0).toLocaleString()}{" "}
          <span className="font-semibold text-[#A4506C]"> LIKES</span>
        </span>
        <span className="flex items-center justify-center gap-2">
          <span>
            <RepostIcon className="text-[1.3rem]" />
          </span>
          {(trackData.repost_count ?? 0).toLocaleString()}
          <span className={"font-semibold text-[#F91FC3]"}> REPOSTS</span>
        </span>
      </div>
      <div className="flex items-center justify-center w-[70%] h-20 gap-2 mb-6">
        <WaveProgress />
      </div>
    </div>
  );
}
