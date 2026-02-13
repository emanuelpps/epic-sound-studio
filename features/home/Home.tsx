import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";
import Aside from "./components/Aside";
import BottomSection from "./components/BottomSection";
import Main from "./components/Main";

export default function Home() {
  return (
    <PlayerBackground className="">
      <div className="grid grid-cols-[1fr_460px] grid-rows-[550px_550px] ">
        <Main />
        <Aside />
        <BottomSection />
      </div>
    </PlayerBackground>
  );
}
