import Image from "next/image";
import { ComponentProps } from "react";

type LogoContainerProps = ComponentProps<"div"> & {
  width: number;
  height: number;
  src: string;
  alt?: string;
};

export default function LogoContainer({
  width,
  height,
  src,
  alt = "Logo",
  className = "",
  ...props
}: LogoContainerProps) {
  return (
    <div
      className="flex flex-col items-center mb-4 cursor-default group"
      {...props}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#f91fc3] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700" />
        <div className={`relative ${className}`}>
          <Image src={src} alt={alt} width={width} height={height} priority />
        </div>
      </div>
    </div>
  );
}
