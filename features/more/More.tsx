import Logo from "./components/Logo";
import Container from "./components/Container";
import LandingBackground from "@/shared/components/ui/Background/LandingBackground";

export default function More() {
  return (
    <LandingBackground className="max-w-7xl">
      <Logo />
      <Container />
    </LandingBackground>
  );
}
