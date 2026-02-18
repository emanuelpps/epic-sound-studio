"use client";

import { GlowSkeleton } from "../Loaders/GlowSkeleton";


export function TrackCardSkeleton() {
  return (
    <div className="min-w-[20%] space-y-3">
      <GlowSkeleton className="w-full aspect-square rounded-2xl" />
      <GlowSkeleton className="h-4 w-3/4" />
      <GlowSkeleton className="h-3 w-1/2 opacity-70" />
    </div>
  );
}
