import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { IoFlameOutline } from "react-icons/io5";

export default function UndergroundTrendingTracks() {
  const tracks = [
    {
      id: "u1",
      title: "Neon Tunnels",
      artist: "Sub District",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      plays: "92K",
    },
    {
      id: "u2",
      title: "Midnight Circuits",
      artist: "Analog Crew",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      plays: "81K",
    },
    {
      id: "u3",
      title: "Warehouse Echoes",
      artist: "Basement Unit",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      plays: "77K",
    },
    {
      id: "u4",
      title: "Dark Signal",
      artist: "Night Operator",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
      plays: "69K",
    },
  ];

  return (
    <section className="col-span-2 rounded-3xl bg-gradient-to-br from-[#120914]/70 to-[#09050a]/80 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_50px_rgba(249,31,195,0.08)] mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-[#f91fc3]/10 border border-[#f91fc3]/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,31,195,0.35)]">
          <IoFlameOutline className="text-xl text-[#f91fc3]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Underground Trending
          </h2>
          <p className="text-xs text-white/50">
            Rising sounds from the underground scene
          </p>
        </div>
      </div>
      <div className="flex gap-6 pb-2 scrollbar-none">
        {tracks.map((t, i) => (
          <div key={t.id} className="relative min-w-[220px] group">
            <div className="absolute -top-3 -left-3 z-20 h-8 w-8 rounded-full bg-black border border-[#f91fc3]/60 text-xs text-white flex items-center justify-center shadow-[0_0_14px_rgba(249,31,195,0.6)]">
              #{i + 1}
            </div>
            <TrackCard title={t.title} artist={t.artist} image={t.cover} />
            <div className="mt-3 text-xs text-white/50 flex justify-between px-1 opacity-80 group-hover:opacity-100 transition">
              <span>Underground chart</span>
              <span className="text-[#f91fc3]">{t.plays} plays</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-[#1a0d1c]/60 border border-white/10 text-xs text-white/60 flex justify-between items-center">
        <span>Updated hourly from emerging artists</span>
        <span className="text-[#f91fc3] tracking-wider uppercase cursor-pointer hover:text-white transition">
          View chart →
        </span>
      </div>
    </section>
  );
}
