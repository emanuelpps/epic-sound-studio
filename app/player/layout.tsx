import { MiniPlayer } from "@/shared/components/ui/miniPlayer/MiniPlayer";
import NavBar from "@/shared/components/layout/Nav/NavBar";
import MobileTabBar from "@/shared/components/layout/Nav/MobileTabBar";
import { AudioEngine } from "@/shared/components/ui/AudioEngine/AudioEngine";
import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* Mobile: flex column → content (flex-1) above, tab bar below.
       Desktop (md+): grid → sidebar | content. */
    <section className="flex flex-col h-screen overflow-hidden md:grid md:grid-cols-[200px_1fr] md:grid-rows-[1fr]">
      <NavBar />
      <PlayerBackground className="flex-1 min-h-0">{children}</PlayerBackground>
      <MobileTabBar />
      <MiniPlayer />
      <AudioEngine />
    </section>
  );
}
