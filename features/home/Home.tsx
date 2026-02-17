"use client";
import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";
import Aside from "./components/Aside";
import Main from "./components/Main";
import MusicGenresSection from "./components/MusicGenreSection";
import UndergroundTrendingTracks from "./components/UndergroundTrendingTracks";
import TrendingTracksServer from "./components/TrendingTracksServer";

export default function Home() {
  return (
    <PlayerBackground className="">
      <div className="grid grid-cols-[1fr_350px] grid-rows-[500px_auto] gap-4 p-6">
        <Main />
        <Aside />
        <TrendingTracksServer />
        <MusicGenresSection />
        <UndergroundTrendingTracks />
      </div>
    </PlayerBackground>
  );
}
