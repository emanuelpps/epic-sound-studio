import Menu from "./components/Menu";

/**
 * Mobile bottom navigation. Hidden on md+ (desktop uses NavBar sidebar).
 * It takes real layout space at the bottom of the mobile flex column, so it
 * never overlays content — no padding hacks needed.
 */
export default function MobileTabBar() {
  return (
    <nav className="md:hidden shrink-0 bg-[#230F1E]/95 backdrop-blur-lg border-t border-[#f91fc3]/20 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
      <Menu variant="bottom" />
    </nav>
  );
}
