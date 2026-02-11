import NavBar from "@/shared/components/layout/Nav/NavBar";
import PlayerBackground from "@/shared/components/ui/Background/PlayerBackground";

export default function PlayerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-screen h-screen">
      <NavBar />
      <PlayerBackground>{children}</PlayerBackground>
    </section>
  );
}
