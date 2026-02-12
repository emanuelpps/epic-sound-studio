"use client";

import { ReactNode } from "react";
import { FaMusic, FaGlobe, FaUserFriends } from "react-icons/fa";
import { MdHighQuality } from "react-icons/md";

interface ContentProps {
  index: number;
  icon: ReactNode;
  title: string;
  description: string;
}

function ContentCard({ index, icon, title, description }: ContentProps) {
  return (
    <div
      className={`${index === 0 ? "border-none" : "border-l-[1px]"} border-[#f91fc333] shadow-[0_8px_32px_rgba(0, 0, 0, 0.4)] p-6 flex flex-col text-left hover:scale-[1.02] transition-transform duration-300 w-full gap-5 leading-loose tracking-wider`}
    >
      <div className="text-3xl text-[#f91fc3]">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-gray-300 text-md">{description}</p>
    </div>
  );
}

const MORE_ITEMS = [
  {
    icon: <FaMusic />,
    title: "Open Music Discovery",
    description:
      "Explore a massive catalog of music powered by Audius — an open streaming network where artists share tracks directly with listeners and fans discover new sounds every day.",
  },
  {
    icon: <FaGlobe />,
    title: "Built on an Open Network",
    description:
      "Audius runs on a decentralized, community-powered infrastructure designed for openness, resilience, and global access to music without traditional platform limits.",
  },
  {
    icon: <FaUserFriends />,
    title: "Artist-First Platform",
    description:
      "Creators can publish and grow their audience directly. The ecosystem is designed to support artists and give them more visibility and connection with listeners.",
  },
  {
    icon: <MdHighQuality />,
    title: "High-Quality Streaming",
    description:
      "Enjoy fast playback and high-quality audio with a clean listening experience focused on discovery, playlists, and uninterrupted sessions.",
  },
];

export default function Content() {
  return (
    <section className="grid w-full grid-cols-1 mx-auto md:grid-cols-2 xl:grid-cols-4">
      {MORE_ITEMS.map((item, index) => (
        <ContentCard
          index={index}
          key={item.title}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </section>
  );
}
