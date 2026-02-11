import GlassContainer from "@/shared/components/ui/GlassContainer/GlassContainer";
import BottomSection from "./BottomSection";
import Content from "./Content";

export default function Container() {
  return (
    <GlassContainer>
      <Content />
      <BottomSection />
    </GlassContainer>
  );
}
