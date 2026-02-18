"use client";

import { useRef } from "react";
import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useTrendingTracks } from "@/queries/useTrendingTracks";
import { mapTrackToUI } from "@/services/mappers";
import { TrendingSectionSkeleton } from "@/shared/components/ui/Skeletons/TrendingSelectionSkeleton";

export default function TrendingTracks() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useTrendingTracks();

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
    <section className="col-span-2 rounded-3xl bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)]">
      <div className="flex justify-between w-full">
        <div className="mb-6 relative pl-5 flex flex-col">
          <span className="absolute left-0 top-1 bottom-1 w-[6px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
            Trending Tracks
          </h2>
          <p className="text-sm text-white/50 mt-1">Most played right now</p>
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
        className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {uiTracks.slice(1).map((t) => (
          <div key={t.id} className="min-w-[20%]">
            <TrackCard title={t.title} artist={t.artist} image={t.artwork} />
          </div>
        ))}
      </div>
    </section>
  );
}
