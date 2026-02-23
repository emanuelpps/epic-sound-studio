import TrackInfo from "./TrackInfo";
import PlayerControls from "./PlayerControls";

export default function MainContainer() {
  return (
    <div className="flex flex-col w-full gap-10">
      <TrackInfo />
      <PlayerControls />
    </div>
  );
}
