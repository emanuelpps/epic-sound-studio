import MainContainer from "./components/MainContainer";
import PlaylistContainer from "./components/PlaylistContainer";

export default function Player() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#1a0028] via-[#0b1020] to-[#000] text-white flex justify-center items-start gap-10 p-10">
      <MainContainer />
      <PlaylistContainer />
    </section>
  );
}
