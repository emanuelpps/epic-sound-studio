import { useTrendingPlaylists } from "@/queries/useTrendingPlaylist";
import { PlaylistMiniCard } from "@/shared/components/ui/Cards/PlaylistCard";
import { PlaylistMiniCardSkeleton } from "@/shared/components/ui/Skeletons/PlaylistMiniCardSkeleton";
import { IoTrendingUpSharp } from "react-icons/io5";

export default function Aside() {
  const { data, isLoading, error } = useTrendingPlaylists();
  if (isLoading) {
    return (
      <aside className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)] rounded-2xl mt-4">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <PlaylistMiniCardSkeleton key={i} />
          ))}
        </div>
      </aside>
    );
  }

  if (error) return null;

  if (!data || data.length === 0) return null;

  const trendingPlaylists = data.slice(0, 5);

  return (
    <aside className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)] rounded-2xl mt-4">
      <div className="mb-6 relative flex gap-2 justify-start items-center">
        <IoTrendingUpSharp className="text-[#f91fc3] text-2xl filter drop-shadow-[0_0_6px_#f91fc3] drop-shadow-[0_0_14px_#f91fc3] drop-shadow-[0_0_28px_rgba(249,31,195,0.9)]" />
        <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
          Trending Playlist
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        {trendingPlaylists.map((p) => (
          <PlaylistMiniCard
            key={p.id}
            image={p.cover}
            title={p.title}
            tracks={p.playlist_count}
            likes={p.likes}
          />
        ))}
      </div>
    </aside>
  );
}
