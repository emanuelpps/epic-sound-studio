import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import PlayIcon from "../Icons/Play";
import { useState, useEffect } from "react";

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
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const play = usePlayerStore((s) => s.play);
  const toggleLike = usePlayerStore((s) => s.toggleLike);
  const isTrackLiked = usePlayerStore((s) => s.isTrackLiked);
  const initializeLikes = usePlayerStore((s) => s.initializeLikes);

  useEffect(() => {
    initializeLikes();
    setIsLiked(isTrackLiked(trackId));
  }, [trackId, isTrackLiked, initializeLikes]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleLike(trackId);
    setIsLiked(!isLiked);
  };


  return (
    <div className="relative flex flex-col justify-end w-full h-full min-h-[360px] sm:min-h-[420px] p-5 sm:p-8 lg:p-10 overflow-hidden bg-black border rounded-3xl border-fuchsia-500/20">
      <Image
        src={imgSrc || cover}
        alt={title}
        fill
        className="object-cover scale-100 opacity-70"
        unoptimized
        onError={() => setImgSrc("/images/placeholder.jpg")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,31,195,0.25),transparent_60%)]" />
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs tracking-widest uppercase font-semibold w-fit rounded-full px-4 py-1 bg-[#f91fc3]/90 text-black shadow-[0_0_20px_rgba(249,31,195,0.6)]">
          Top Track
        </p>
        <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white line-clamp-2 drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
          {title}
        </h1>
        <p className="mt-3 text-base sm:text-lg font-medium tracking-wide text-white/80">
          {artist}
        </p>
        {description && (
          <p className="max-w-xl mt-4 text-sm sm:text-base text-white/60 line-clamp-2 sm:line-clamp-none">{description}</p>
        )}
        <div className="flex items-center gap-4 mt-6 sm:mt-8">
          <button
            className="flex justify-center items-center px-8 py-3 rounded-full bg-[#f91fc3] text-black font-semibold hover:scale-105 transition shadow-[0_0_30px_rgba(249,31,195,0.6)] cursor-pointer"
            onClick={() => handlePlay(trackId, title, artist, play)}
          >
            <PlayIcon className="mr-2" /> Listen Now
          </button>
          <button
            onClick={handleLikeClick}
            className="flex items-center justify-center w-12 h-12 transition border rounded-full hover:bg-white/10 hover:border-[#f91fc3] group"
            style={{
              borderColor: isLiked ? "#f91fc3" : "rgba(255,255,255,0.2)",
            }}
          >
            {isLiked ? (
              <FaHeart size={20} className="text-[#f91fc3]" />
            ) : (
              <FiHeart size={20} className="group-hover:text-[#f91fc3]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
