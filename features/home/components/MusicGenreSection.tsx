"use client";

import { useEffect, useState } from "react";

type Genre = {
  name: string;
  count?: number;
};

export default function MusicGenresSection() {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function loadGenres() {
      const data: Genre[] = [
        { name: "Electronic", count: 1200 },
        { name: "House", count: 980 },
        { name: "Techno", count: 760 },
        { name: "Synthwave", count: 540 },
        { name: "Ambient", count: 430 },
        { name: "Lo-Fi", count: 620 },
        { name: "Drum & Bass", count: 390 },
        { name: "Trap", count: 710 },
        { name: "Chill", count: 660 },
      ];

      setGenres(data);
    }

    loadGenres();
  }, []);

  return (
    <section className="col-span-2 mb-12 rounded-3xl bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)]">
      <div className="mb-8 relative pl-5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="absolute left-0 top-1 bottom-1 w-[6px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
            Music Genres
          </h2>
          <p className="text-sm text-white/50 mt-1">Discover tracks by style</p>
        </div>
        <button className="text-xs uppercase tracking-wider text-white/60 border border-white/10 px-4 py-2 rounded-full hover:border-[#f91fc3]/40 hover:text-white transition">
          Explore all
        </button>
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

            {g.count && (
              <span className="ml-2 text-xs text-white/40 group-hover:text-white/70">
                {g.count}
              </span>
            )}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_center,rgba(249,31,195,0.18),transparent_70%)]" />
          </button>
        ))}
      </div>
    </section>
  );
}
