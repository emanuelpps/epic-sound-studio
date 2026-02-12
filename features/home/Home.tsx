import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";
import Aside from "./components/Aside";
import BottomSection from "./components/BottomSection";
import Main from "./components/Main";

export default function Home() {
  return (
    <PlayerBackground className="h-full overflow-hidden">
      <div className="grid grid-cols-[1fr_360px] grid-rows-[1fr_280px] h-full">
        <Main />
        <Aside />
        <BottomSection />
      </div>
    </PlayerBackground>
  );
}
