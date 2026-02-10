import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-4 cursor-default group">
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-[#f91fc3] blur-2xl opacity-30 rounded-full group-hover:opacity-60 transition-opacity duration-700" />
        <div className="relative bg-black/50 border border-[#f91fc3]/40 p-6 rounded-full">
          <Image src="/images/epic-sound-studio-logo.svg" alt="Epic Sound Logo" width={200} height={200}/>
        </div>
      </div>
    </div>
  );
}
