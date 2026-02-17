import Image from "next/image";
import { FiHeart } from "react-icons/fi";

interface Props {
  title: string;
  artist: string;
  cover: string;
  description?: string;
}

export function HeroCard({ title, artist, cover, description }: Props) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-fuchsia-900/40 to-black border border-fuchsia-500/20 p-8 h-full w-full flex flex-col justify-end">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,200,0.25),transparent_60%)]" />

      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover opacity-60 z-0"
        unoptimized
      />
      <div className="relative z-10 w-full">
        <p className="text-xs font-semibold w-fit rounded-lg px-3 py-1 bg-[#f91fc3]">
          TOP TRACK
        </p>
        <h1 className="text-5xl font-bold mb-3 text-white">{title}</h1>
        <p className="text-white/80 mb-2">{artist}</p>
        {description && <p className="text-white/70 mb-6">{description}</p>}
        <div className="flex gap-4 items-center">
          <button className="px-6 py-2 rounded-full bg-[#f91fc3] hover:bg-[#f91fc3]/30 transition cursor-pointer">
            ▶ Listen Now
          </button>
          <button className="w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 flex justify-center items-center">
            <FiHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
