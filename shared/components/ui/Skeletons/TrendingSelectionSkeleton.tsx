"use client";

import { TrackCardSkeleton } from "@/shared/components/ui/Cards/TrackCardSkeleton";

export function TrendingSectionSkeleton() {
  return (
    <section className="relative col-span-2 rounded-3xl bg-gradient-to-br from-[#120914]/70 to-[#09050a]/80 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_50px_rgba(249,31,195,0.08)] mb-12">
      <div className="flex justify-between w-full">
        <div className="mb-6 relative pl-5 flex flex-col">
          <div className="h-6 w-56 bg-[#2a1630] rounded-lg" />
          <div className="h-4 w-40 bg-[#221326] rounded-lg opacity-70" />
        </div>
      </div>
      <div className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
        {Array.from({ length: 5 }).map((_, i) => (
          <TrackCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
