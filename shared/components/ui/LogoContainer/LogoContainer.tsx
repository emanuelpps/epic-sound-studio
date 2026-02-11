import Image from "next/image";
import { ComponentProps } from "react";

type LogoContainerProps = ComponentProps<"div"> & {
  width: number;
  height: number;
};

export default function LogoContainer({
  width,
  height,
  className = "",
  ...props
}: LogoContainerProps) {
  return (
    <div
      className="flex flex-col items-center mb-4 cursor-default group"
      {...props}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#f91fc3] blur-2xl opacity-30 rounded-full group-hover:opacity-60 transition-opacity duration-700" />
        <div className={`relative bg-black/50 rounded-full ${className}`}>
          <Image
            src="/images/epic-sound-studio-logo.svg"
            alt="Epic Sound Studio logo"
            width={width}
            height={height}
            priority
          />
        </div>
      </div>
    </div>
  );
}
