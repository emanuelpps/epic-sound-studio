"use client";

import { useTrendingTracks } from "@/queries/useTrendingTracks";
import { useMemo } from "react";

export default function MusicGenresSection() {
  const { data: tracks, isLoading } = useTrendingTracks();

  const genres = useMemo(() => {
    if (!tracks) return [];

    const map = new Map<string, number>();

    tracks.forEach((track) => {
      if (!track.genre) return;

      map.set(track.genre, (map.get(track.genre) || 0) + 1);
    });

    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [tracks]);

  if (isLoading) return null;
  if (!genres.length) return null;

  return (
    <section className="col-span-2 rounded-3xl bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)]">
      <div className="mb-8 relative pl-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="absolute left-0 top-1 bottom-1 w-[6px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
            Music Genres
          </h2>
          <p className="text-sm text-white/50 mt-1">Discover tracks by style</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {genres.map((g) => (
          <button
            key={g.name}
            className="
              group relative px-5 py-3 rounded-2xl
              bg-[#1a0d1c]/80 border border-white/10
              text-sm text-white/80
              transition-all duration-300
              hover:scale-105 hover:text-white
              hover:border-[#f91fc3]/40
              hover:shadow-[0_0_18px_rgba(249,31,195,0.25)]
              cursor-pointer
            "
          >
            <span className="relative z-10">{g.name}</span>
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_center,rgba(249,31,195,0.18),transparent_70%)]" />
          </button>
        ))}
      </div>
    </section>
  );
}
