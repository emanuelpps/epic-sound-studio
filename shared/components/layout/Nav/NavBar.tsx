import Logo from "./components/Logo";
import Menu from "./components/Menu";

export default function NavBar() {
  return (
    <nav className="flex flex-col min-h-[100vh] overflow-hidden bg-[#230F1E]">
      <Logo />
      <Menu />
    </nav>
  );
}
