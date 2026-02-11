import Container from "./sections/Container";
import LandingBackground from "@/shared/components/ui/Background/LandingBackground";

export default function Landing() {
  return (
    <LandingBackground className="max-w-3xl py-12">
      <Container />
    </LandingBackground>
  );
}
