"use client";

import { GlowSkeleton } from "@/shared/components/ui/Skeletons/GlowSkeleton";

export function TrackInfoSkeleton() {
  return (
    <div className="flex flex-col items-center text-center">
      <GlowSkeleton className="w-[320px] h-[320px] rounded-3xl mb-8" />
      <GlowSkeleton className="w-64 h-8 mb-3 rounded-xl" />
      <GlowSkeleton className="w-40 h-5 mb-6 rounded-lg" />
      <div className="flex gap-8 mb-8">
        <GlowSkeleton className="w-24 h-6 rounded-lg" />
        <GlowSkeleton className="w-24 h-6 rounded-lg" />
        <GlowSkeleton className="w-24 h-6 rounded-lg" />
      </div>
      <GlowSkeleton className="w-[70%] h-20 rounded-2xl" />
    </div>
  );
}
