import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import { useUIStore } from "@/stores/uiStore";
import Image from "next/image";
import PlayIcon from "../Icons/Play";
import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

interface TrackCardProps {
  trackId: string;
  image: string;
  title: string;
  artist: string;
  artistHandle?: string;
  artistId?: string;
}
export function TrackCard({ trackId, image, title, artist, artistHandle, artistId }: TrackCardProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const play = usePlayerStore((s) => s.play);
  const toggleLike = usePlayerStore((s) => s.toggleLike);
  const isTrackLiked = usePlayerStore((s) => s.isTrackLiked);
  const initializeLikes = usePlayerStore((s) => s.initializeLikes);
  const setSelectedArtist = useUIStore((s) => s.setSelectedArtist);
  const setView = useUIStore((s) => s.setView);

  useEffect(() => {
    initializeLikes();
    setIsLiked(isTrackLiked(trackId));
  }, [trackId, isTrackLiked, initializeLikes]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(trackId);
    setIsLiked(!isLiked);
  };

  const handleArtistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (artistHandle && artistId) {
      setSelectedArtist(artistHandle, artistId);
      setView("artist");
    }
  };

  return (
    <div
      className="group w-52 cursor-pointer"
      onClick={() => handlePlay(trackId, title, artist, play)}
    >
      <div className="relative rounded-xl overflow-hidden">
        <Image
          alt={title}
          src={imgSrc || image}
          width={100}
          height={100}
          className="w-full h-50 object-cover group-hover:scale-105 transition"
          unoptimized
          onError={() => setImgSrc("/images/placeholder.jpg")}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition bg-fuchsia-600 rounded-full w-10 h-10 shadow-lg flex items-center justify-center">
          <PlayIcon className="text-white text-sm ml-1" />
        </div>
        <button
          onClick={handleLikeClick}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-black/60 hover:bg-black/80 rounded-full w-10 h-10 shadow-lg flex items-center justify-center backdrop-blur-sm"
        >
          {isLiked ? (
            <FaHeart size={16} className="text-[#f91fc3]" />
          ) : (
            <FiHeart size={16} className="text-white" />
          )}
        </button>
      </div>
      <div className="mt-3">
        <p className="text-sm text-white font-medium truncate">{title}</p>
        {artistHandle && artistId ? (
          <button
            onClick={handleArtistClick}
            className="text-xs text-gray-400 hover:text-[#f91fc3] transition truncate text-left w-full"
          >
            {artist}
          </button>
        ) : (
          <p className="text-xs text-gray-400 truncate">{artist}</p>
        )}
      </div>
    </div>
  );
}
