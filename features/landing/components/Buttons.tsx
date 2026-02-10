import ButtonFactory from "@/shared/components/ui/Buttons/ButtonFactory";
import CTAButton from "@/shared/components/ui/Buttons/CTAButton";
import HeroButton from "@/shared/components/ui/Buttons/HeroButton";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
export default function Buttons() {
  return (
    <div className="flex flex-col items-center w-full max-w-lg gap-6 md:flex-row mb-2">
      <HeroButton isLink href="/app">
        Explore Studio
      </HeroButton>
      <CTAButton>Learn More</CTAButton>
    </div>
  );
}
