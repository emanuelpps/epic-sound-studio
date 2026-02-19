"use client";

import Aside from "./components/Aside";
import Main from "./components/Main";
import MusicGenresSection from "./components/MusicGenreSection";
import UndergroundTrendingTracks from "./components/UndergroundTrendingTracks";
import TrendingTracks from "./components/TrendingTracks";

export default function Home() {
  return (
    <section className="grid grid-cols-[1fr_350px] grid-rows-[580px_auto] gap-4 p-6">
      <Main />
      <Aside />
      <TrendingTracks />
      <MusicGenresSection />
      <UndergroundTrendingTracks />
    </section>
  );
}
