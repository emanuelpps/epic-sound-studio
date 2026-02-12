import ButtonFactory from "@/shared/components/ui/Buttons/ButtonFactory";
import { GoArrowRight } from "react-icons/go";
export default function Buttons() {
  return (
    <div className="flex flex-col items-center w-full max-w-lg gap-6 md:flex-row mb-2">
      <ButtonFactory variant="primary" link="/player">
        <span className="absolute inset-0 transition-transform duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
        <span className="relative z-10 tracking-widest uppercase">
          Listen Now
        </span>
      </ButtonFactory>
      <ButtonFactory variant="secondary" link="/more">
        <span className="flex justify-center items-center h-full w-full gap-1">
          Learn More
          <GoArrowRight />
        </span>
      </ButtonFactory>
    </div>
  );
}
