import { handlePlay } from "@/lib/functions/handlePlay";
import { getTrackStreamUrl } from "@/services/tracks/streamTrack";
import { usePlayerStore } from "@/stores/playerStore";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";

interface Props {
  trackId: string;
  title: string;
  artist: string;
  cover: string;
  description?: string;
}

export function HeroCard({
  trackId,
  title,
  artist,
  cover,
  description,
}: Props) {
  const play = usePlayerStore((s) => s.play);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-fuchsia-500/20 h-full w-full flex flex-col justify-end p-10 bg-black">
      <Image
        src={cover}
        alt={title}
        fill
        className="object-cover scale-105 opacity-70"
        unoptimized
      />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,31,195,0.25),transparent_60%)]" />
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs tracking-widest uppercase font-semibold w-fit rounded-full px-4 py-1 bg-[#f91fc3]/90 text-black shadow-[0_0_20px_rgba(249,31,195,0.6)]">
          Top Track
        </p>
        <h1 className="mt-4 text-6xl font-black leading-[1.05] tracking-tight text-white line-clamp-2 drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
          {title}
        </h1>
        <p className="mt-3 text-white/80 text-lg font-medium tracking-wide">
          {artist}
        </p>
        {description && (
          <p className="mt-4 text-white/60 max-w-xl">{description}</p>
        )}
        <div className="mt-8 flex gap-4 items-center">
          <button
            className="flex justify-center items-center px-8 py-3 rounded-full bg-[#f91fc3] text-black font-semibold hover:scale-105 transition shadow-[0_0_30px_rgba(249,31,195,0.6)] cursor-pointer"
            onClick={() => handlePlay(trackId, title, artist, play)}
          >
            <FaPlay className="mr-2" /> Listen Now
          </button>
          <button className="w-12 h-12 rounded-full border border-white/20 hover:bg-white/10 flex justify-center items-center transition">
            <FiHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
