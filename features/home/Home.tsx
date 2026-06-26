"use client";

import Aside from "./components/Aside";
import Main from "./components/Main";
import MusicGenresSection from "./components/MusicGenreSection";
import UndergroundTrendingTracks from "./components/UndergroundTrendingTracks";
import TrendingTracks from "./components/TrendingTracks";

export default function Home() {
  return (
    <section className="h-full overflow-y-auto overflow-x-hidden grid grid-cols-1 lg:grid-cols-[1fr_350px] lg:grid-rows-[580px_auto] gap-4 p-4 sm:p-6 pb-28 md:pb-8">
      <Main />
      <Aside />
      <TrendingTracks />
      <MusicGenresSection />
      <UndergroundTrendingTracks />
    </section>
  );
}
