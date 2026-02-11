import GlowBackground from "@/shared/components/ui/Background/GlowBackground";
import Link from "next/link";
import { ComponentProps } from "react";

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
        flex items-center justify-center relative overflow-hidden
        font-display
      `}
      {...props}
    >
      <div className="absolute inset-0 z-0">
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
      <div className="absolute z-20 bottom-2 right-6">
        <div className="glass-panel px-3 py-1.5 rounded-3xl text-xs text-white/80 flex gap-2">
          <span>Crafted by</span>
          <Link
            href="https://emanuelp-portfolio.vercel.app/"
            target="_blank"
            className="italic hover:text-[#f91fc3] transition"
          >
            Emanuel Pagés
          </Link>
        </div>
      </div>
    </main>
  );
}
