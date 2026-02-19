import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import Image from "next/image";

interface TrackCardProps {
  trackId: string;
  image: string;
  title: string;
  artist: string;
}
export function TrackCard({ trackId, image, title, artist }: TrackCardProps) {
  const play = usePlayerStore((s) => s.play);

  return (
    <div
      className="group w-52 cursor-pointer"
      onClick={() => handlePlay(trackId, title, artist, play)}
    >
      <div className="relative rounded-xl overflow-hidden">
        <Image
          alt={title}
          src={image}
          width={100}
          height={100}
          className="w-full h-50 object-cover group-hover:scale-105 transition"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
        <button className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition bg-fuchsia-600 rounded-full w-10 h-10 shadow-lg">
          ▶
        </button>
      </div>
      <div className="mt-3">
        <p className="text-sm text-white font-medium truncate">{title}</p>
        <p className="text-xs text-gray-400">{artist}</p>
      </div>
    </div>
  );
}
