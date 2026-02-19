import MainContainer from "./components/MainContainer";
import PlaylistContainer from "./components/PlaylistContainer";

export default function Player() {
  return (
    <section className="flex w-full h-[800px] min-h-screen">
      <MainContainer />
      <PlaylistContainer />
    </section>
  );
}
