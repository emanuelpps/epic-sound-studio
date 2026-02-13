import NavBar from "@/shared/components/layout/Nav/NavBar";
import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[120px_1fr] w-screen">
      <NavBar />
      {children}
    </section>
  );
}