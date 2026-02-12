import Logo from "./components/Logo";
import Menu from "./components/Menu";

export default function NavBar() {
  return (
    <nav className="row-span-5 w-full min-h-[100vh] overflow-hidden bg-[#230F1E] border-r border-[#f91fc333] shadow-[0_8px_32px_rgba(0, 0, 0, 0.4)]">
      <Logo />
      <Menu />
    </nav>
  );
}
