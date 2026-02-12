import NavBar from "@/shared/components/layout/Nav/NavBar";
import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[120px_1fr] h-screen w-screen">
      <NavBar />
      <PlayerBackground className="h-full overflow-hidden">
        <div className="grid grid-cols-[1fr_160px] grid-rows-[1fr_auto] h-full">
          <main className="overflow-y-auto p-6 flex flex-col gap-6">
            <SearchBar />
            {children}
          </main>
          <aside className="overflow-y-auto border-l border-white/10 bg-black/20 backdrop-blur-xl p-4">
            RightPanel
          </aside>
          <div
            className="
        col-span-2
        border-t border-white/10
        p-6
        bg-black/10
      "
          >
            BottomSection
          </div>
        </div>
      </PlayerBackground>
    </section>
  );
}
