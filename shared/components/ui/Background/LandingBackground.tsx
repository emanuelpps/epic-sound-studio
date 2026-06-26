import GlowBackground from "@/shared/components/ui/Background/GlowBackground";
import { ComponentProps } from "react";
import CraftedBy from "./CraftedBy";

type LandingBackgroundProps = ComponentProps<"main">;

export default function LandingBackground({
  children,
  className = "",
  ...props
}: LandingBackgroundProps) {
  const childrenClasses = `${className}`;
  return (
    <main
      className={`
        bg-[#230f1e] text-white h-screen w-screen
        flex items-start sm:items-center justify-center relative overflow-y-auto
        font-display
      `}
      {...props}
    >
      <div className="fixed inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-60 blur-[2px] scale-105"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/videos/background_Motion_Graphic.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-[#230f1e]/80 via-transparent to-[#230f1e]/90 z-10" />
      </div>
      <GlowBackground />
      <div
        className={`relative z-10 w-full 
        ${childrenClasses}`}
      >
        {children}
      </div>
      <CraftedBy />
    </main>
  );
}
