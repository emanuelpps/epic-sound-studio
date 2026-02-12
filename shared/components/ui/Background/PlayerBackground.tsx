import GlowBackground from "@/shared/components/ui/Background/GlowBackground";
import { ComponentProps } from "react";
import CraftedBy from "./CraftedBy";

type PlayerBackgroundProps = ComponentProps<"main">;

export default function PlayerBackground({
  children,
  className = "",
  ...props
}: PlayerBackgroundProps) {
  const childrenClasses = `${className}`;
  return (
    <main
      className={`
        bg-[#230f1e] text-white h-screen
        relative overflow-hidden
        font-display
      `}
      {...props}
    >
      <div className="absolute inset-0 z-0">
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
