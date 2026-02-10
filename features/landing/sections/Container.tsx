import BottomContainer from "../components/Bottom";
import Buttons from "../components/Buttons";
import Description from "../components/Description";
import HeadLine from "../components/HeadLine";
import Logo from "../components/Logo";


export default function Container() {
  return (
    <div className="flex flex-col items-center p-8 text-center glass-panel rounded-3xl md:p-20">
      <Logo />
      <HeadLine />
      <Description />
      <Buttons />
      <BottomContainer />
    </div>
  );
}
