"use client";

import { GlowSkeleton } from "../Loaders/GlowSkeleton";

export function PlaylistMiniCardSkeleton() {
  return (
    <div className="flex gap-3 items-center p-3 rounded-xl bg-[#2E1C2B]">
      <GlowSkeleton className="w-[60px] h-[60px] rounded-lg flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <GlowSkeleton className="h-4 w-32 rounded-md" />
        <div className="flex gap-3">
          <GlowSkeleton className="h-3 w-16 rounded-md" />
          <GlowSkeleton className="h-3 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}
