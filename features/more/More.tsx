import Logo from "./components/Logo";
import Container from "./components/Container";
import LandingBackground from "@/shared/components/ui/Background/LandingBackground";

export default function More() {
  return (
    <LandingBackground className="max-w-7xl px-4 py-8 sm:py-12">
      <Logo />
      <Container />
    </LandingBackground>
  );
}
