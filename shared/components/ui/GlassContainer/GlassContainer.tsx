import { ReactNode } from "react";

interface GlassContainerProps {
  children: ReactNode;
}

export default function GlassContainer({ children }: GlassContainerProps) {
  return (
    <div className="flex flex-col items-center p-8 text-center glass-panel rounded-3xl md:p-20">
      {children}
    </div>
  );
}
