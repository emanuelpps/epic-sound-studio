import { PlaylistMiniCard } from "@/shared/components/ui/Cards/PlaylistCard";
import { IoTrendingUpSharp } from "react-icons/io5";

export default function Aside() {
  const trendingPlaylists = [
    {
      id: "pl1",
      title: "Cyberpunk Essentials",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      tracksCount: 45,
      likes: 2400,
      genre: "synthwave",
    },
    {
      id: "pl2",
      title: "Neon Nights Drive",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      tracksCount: 32,
      likes: 1800,
      genre: "electronic",
    },
    {
      id: "pl3",
      title: "Lo-Fi Coding Lab",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      tracksCount: 88,
      likes: 5200,
      genre: "lofi",
    },
    {
      id: "pl4",
      title: "Dark Synthwave",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      tracksCount: 24,
      likes: 950,
      genre: "synthwave",
    },
  ];

  return (
    <aside className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)] rounded-2xl p-6 mt-4">
      <div className="mb-6 relative pl-5 flex gap-2 items-center">
        <IoTrendingUpSharp className="text-[#f91fc3] text-2xl filter drop-shadow-[0_0_6px_#f91fc3] drop-shadow-[0_0_14px_#f91fc3] drop-shadow-[0_0_28px_rgba(249,31,195,0.9)]" />
        <h2 className="text-lg font-semibold uppercase tracking-wide text-white">
          Trending Playlist
        </h2>
      </div>
      {trendingPlaylists.map((p) => (
        <PlaylistMiniCard
          key={p.id}
          image={p.cover}
          title={p.title}
          tracks={p.tracksCount}
        />
      ))}
    </aside>
  );
}
