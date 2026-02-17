import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function TrendingTracks() {
  const trendingTracks = [
    {
      id: "t1",
      title: "Waves of Analog",
      artist: "Retro Future",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
    },
    {
      id: "t2",
      title: "Liquid Dreams",
      artist: "Bass Mechanic",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
    },
    {
      id: "t3",
      title: "Night Drive",
      artist: "Kavinsky Style",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
    },
    {
      id: "t4",
      title: "Crystal Voices",
      artist: "Ethereal Pop",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
    },
    {
      id: "t5",
      title: "Glitch Avenue",
      artist: "Digital Ghost",
      cover:
        "https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/hiofmygmttwrrqxzrxdc",
    },
  ];

  return (
    <section className="col-span-2 rounded-3xl bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 p-6 shadow-[0_0_40px_rgba(249,31,195,0.06)]">
      <div className="flex justify-between w-full">
        <div className="mb-6 relative pl-5 flex flex-col">
          <span className="absolute left-0 top-1 bottom-1 w-[6px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
            Trending Tracks
          </h2>
          <p className="text-sm text-white/50 mt-1">Most played right now</p>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="border border-gray-800 rounded-full p-2">
            <IoIosArrowBack />
          </div>
          <div className="border border-gray-800 rounded-full p-2">
            <IoIosArrowForward />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {trendingTracks.map((t) => (
          <TrackCard
            key={t.id}
            title={t.title}
            artist={t.artist}
            image={t.cover}
          />
        ))}
      </div>
    </section>
  );
}
