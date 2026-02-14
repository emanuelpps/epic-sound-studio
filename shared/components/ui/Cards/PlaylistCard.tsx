import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";

interface PlaylistMiniCardProps {
  image: string;
  title: string;
  tracks: number;
  likes: string;
}
export function PlaylistMiniCard({
  image,
  title,
  tracks,
  likes,
}: PlaylistMiniCardProps) {
  const likesRounded = Math.round(Number(likes)).toLocaleString();
  return (
    <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-white/5 transition cursor-pointer bg-[#2E1C2B]">
      <Image
        alt={title}
        src={image}
        className="w-15 h-15 rounded-lg object-cover"
        width={100}
        height={100}
      />
      <div>
        <p className="text-sm text-white">{title}</p>
        <div className="flex justify-evenly gap-2">
          <p className="flex justify-center  items-center gap-1 text-xs text-gray-400">
            <span>
              <MdQueueMusic />
            </span>
            {tracks} tracks
          </p>
          <p className="flex justify-center  items-center gap-1 text-xs text-gray-400">
            <span>
              <FaHeart />
            </span>
            {likesRounded.slice(0, 3) + "K"}
          </p>
        </div>
      </div>
    </div>
  );
}
