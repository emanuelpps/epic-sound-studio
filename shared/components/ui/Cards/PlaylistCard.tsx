import Image from "next/image";

interface PlaylistMiniCardProps {
  image: string;
  title: string;
  tracks: number;
}
export function PlaylistMiniCard({
  image,
  title,
  tracks,
}: PlaylistMiniCardProps) {
  return (
    <div className="flex gap-3 items-center p-3 rounded-xl hover:bg-white/5 transition cursor-pointer">
      <Image
        alt={title}
        src={image}
        className="w-17 h-17 rounded-lg object-cover"
        width={100}
        height={100}
      />
      <div>
        <p className="text-sm text-white">{title}</p>
        <p className="text-xs text-gray-400">{tracks} tracks</p>
      </div>
    </div>
  );
}
