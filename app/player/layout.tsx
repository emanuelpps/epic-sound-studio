import { MiniPlayer } from "@/shared/components/ui/miniPlayer/MiniPlayer";
import NavBar from "@/shared/components/layout/Nav/NavBar";
import { AudioEngine } from "@/shared/components/ui/AudioEngine/AudioEngine";
import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[120px_1fr]">
      <NavBar />
      <PlayerBackground>{children}</PlayerBackground>
      <MiniPlayer />
      <AudioEngine />
    </section>
  );
}
