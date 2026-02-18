import { GlowSkeleton } from "../Loaders/GlowSkeleton";


export function HeroCardSkeleton() {
  return (
    <div className="relative rounded-3xl bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-10 overflow-hidden">
      <div className="space-y-6 max-w-3xl">
        <GlowSkeleton className="h-6 w-28 rounded-full" />
        <div className="space-y-3">
          <GlowSkeleton className="h-14 w-3/4 rounded-xl" />
          <GlowSkeleton className="h-14 w-2/3 rounded-xl" />
        </div>
        <GlowSkeleton className="h-5 w-40 rounded-lg" />
        <div className="space-y-2">
          <GlowSkeleton className="h-4 w-full rounded-lg" />
          <GlowSkeleton className="h-4 w-5/6 rounded-lg" />
          <GlowSkeleton className="h-4 w-2/3 rounded-lg" />
        </div>
        <div className="flex gap-4 mt-6">
          <GlowSkeleton className="h-12 w-40 rounded-full" />
          <GlowSkeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
