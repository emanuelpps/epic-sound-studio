"use client";

import { TrackCardSkeleton } from "@/shared/components/ui/Cards/TrackCardSkeleton";

export function TrendingSectionSkeleton() {
  return (
    <section className="col-span-2 rounded-3xl bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6">
      <div className="mb-6 space-y-3">
        <div className="h-6 w-56 bg-[#2a1630] rounded-lg" />
        <div className="h-4 w-40 bg-[#221326] rounded-lg opacity-70" />
      </div>

      <div className="flex gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <TrackCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
