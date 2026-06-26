import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";

interface PlaylistMiniCardProps {
  image: string;
  title: string;
  tracks: number;
  likes: number;
  onClick?: () => void;
}
export function PlaylistMiniCard({
  image,
  title,
  tracks,
  likes,
  onClick,
}: PlaylistMiniCardProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const likesLabel =
    likes >= 1_000_000
      ? `${(likes / 1_000_000).toFixed(1)}M`
      : likes >= 1_000
      ? `${(likes / 1_000).toFixed(1)}K`
      : String(Math.round(likes || 0));
  return (
    <div
      onClick={onClick}
      className="flex gap-3 items-center p-3 rounded-xl hover:bg-white/5 transition cursor-pointer bg-[#2E1C2B]"
    >
      <Image
        alt={title}
        src={imgSrc || image}
        className="w-14 h-14 rounded-lg object-cover shrink-0"
        width={100}
        height={100}
        onError={() => setImgSrc("/images/placeholder.jpg")}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm text-white truncate">{title}</p>
        <div className="flex items-center gap-4 mt-0.5">
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <MdQueueMusic />
            {tracks} tracks
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-400">
            <FaHeart />
            {likesLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
