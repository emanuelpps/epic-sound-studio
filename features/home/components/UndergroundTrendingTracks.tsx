"use client";

import { useRef } from "react";
import { useUndergroundTrendingTracks } from "@/queries/useUndergroundTrendingTracks";
import { mapTrackToUI } from "@/services/mappers";
import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { TrendingSectionSkeleton } from "@/shared/components/ui/Skeletons/TrendingSelectionSkeleton";
import { IoFlameOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiHeart } from "react-icons/fi";

export default function UndergroundTrendingTracks() {
  const { data, isLoading, error } = useUndergroundTrendingTracks();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollerRef.current) return;

    const width = scrollerRef.current.clientWidth;

    scrollerRef.current.scrollBy({
      left: dir === "right" ? width : -width,
      behavior: "smooth",
    });
  };

  if (isLoading) return <TrendingSectionSkeleton />;
  if (error || !data || data.length === 0) return null;

  const uiTracks = data.map(mapTrackToUI);

  return (
    <section className="col-span-2 rounded-3xl bg-gradient-to-br from-[#120914]/70 to-[#09050a]/80 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_50px_rgba(249,31,195,0.08)] mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-[#f91fc3]/10 border border-[#f91fc3]/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,31,195,0.35)]">
            <IoFlameOutline className="text-xl text-[#f91fc3]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white tracking-wide">
              Underground Trending
            </h2>
            <p className="text-xs text-white/50">
              Rising sounds from the underground scene
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="border border-gray-800 rounded-full h-10 w-10 p-2 hover:border-[#f91fc3]/50 transition cursor-pointer"
          >
            <IoIosArrowBack className="text-xl w-full flex justify-center items-center" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="border border-gray-800 rounded-full h-10 w-10 p-2 hover:border-[#f91fc3]/50 transition cursor-pointer"
          >
            <IoIosArrowForward className="text-xl w-full flex justify-center items-center" />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pt-6 scroll-smooth no-scrollbar pb-2 z-5"
      >
        {uiTracks.map((t, i) => (
          <div key={t.id} className="relative min-w-[220px] z-20 group">
            <div className="absolute -top-3 -left-3 z-20 h-8 w-8 rounded-full bg-black border border-[#f91fc3]/60 text-xs text-white flex items-center justify-center shadow-[0_0_14px_rgba(249,31,195,0.6)]">
              #{i + 1}
            </div>
            <TrackCard title={t.title} artist={t.artist} image={t.artwork} />
            <div className="mt-3 text-xs text-white/50 flex justify-between px-1 opacity-80 group-hover:opacity-100 transition">
              <span>{t.genre}</span>
              <span className="text-[#f91fc3] flex justify-center items-center gap-2">
                {t.plays}
                <FiHeart size={10} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-[#1a0d1c]/60 border border-white/10 text-xs text-white/60 flex justify-between items-center">
        <span>Updated hourly from emerging artists</span>
        <span className="text-[#f91fc3] tracking-wider uppercase cursor-pointer hover:text-white transition">
          View chart →
        </span>
      </div>
    </section>
  );
}
