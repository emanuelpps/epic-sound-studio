import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";
import Aside from "./components/Aside";
import TrendingTracks from "./components/TrendingTracks";
import Main from "./components/Main";
import MusicGenresSection from "./components/MusicGenreSection";
import UndergroundTrendingTracks from "./components/UndergroundTrendingTracks";

export default function Home() {
  return (
    <PlayerBackground className="">
      <div className="grid grid-cols-[1fr_350px] grid-rows-[500px_auto] gap-4 p-6">
        <Main />
        <Aside />
        <TrendingTracks />
        <MusicGenresSection />
        <UndergroundTrendingTracks />
      </div>
    </PlayerBackground>
  );
}
