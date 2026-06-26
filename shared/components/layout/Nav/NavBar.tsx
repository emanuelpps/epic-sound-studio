import Logo from "./components/Logo";
import Menu from "./components/Menu";
import AccountWidget from "./AccountWidget";

/**
 * Desktop sidebar (md+). On mobile it is hidden and navigation moves to
 * the bottom tab bar (see MobileTabBar). It is the first grid item, so it
 * occupies column 1 of the app shell grid.
 */
export default function NavBar() {
  return (
    <aside className="hidden md:flex md:flex-col w-full h-full overflow-hidden bg-[#230F1E] border-r border-[#f91fc333] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <Logo />
      <Menu />
      <div className="mt-auto p-2 border-t border-white/5">
        <AccountWidget variant="sidebar" />
      </div>
    </aside>
  );
}
