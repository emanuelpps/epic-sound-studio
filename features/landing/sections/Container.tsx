import GlassContainer from "@/shared/components/ui/GlassContainer/GlassContainer";
import BottomContainer from "../components/Bottom";
import Buttons from "../components/Buttons";
import Description from "../components/Description";
import HeadLine from "../components/HeadLine";
import Logo from "../components/Logo";

export default function Container() {
  return (
    <GlassContainer className="p-8 md:p-20">
      <Logo />
      <HeadLine />
      <Description />
      <Buttons />
      <BottomContainer />
    </GlassContainer>
  );
}
