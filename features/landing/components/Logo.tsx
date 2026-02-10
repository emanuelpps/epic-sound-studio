import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col items-center cursor-default group mb-4">
      <div className="relative">
        <div className="absolute inset-0 bg-[#f91fc3] blur-2xl opacity-30 rounded-full group-hover:opacity-60 transition-opacity duration-700" />
        <div className="relative bg-black/50 border border-[#f91fc3]/40 pl-8 pr-8 pt-4 pb-4 rounded-full">
          <Image
            src="/images/epic-sound-studio-logo.svg"
            alt="Epic Sound Logo"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
