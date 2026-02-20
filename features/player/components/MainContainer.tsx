import TrackInfo from "./TrackInfo";
import PlayerControls from "./PlayerControls";
import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";

export default function MainContainer() {
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex w-[80%] justify-end items-end">
        <SearchBar />
      </div>
      <TrackInfo />
      <PlayerControls />
    </div>
  );
}
