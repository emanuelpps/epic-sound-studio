"use client";

import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import { HeroCard } from "@/shared/components/ui/Cards/HeroCard";
import { mapTrackToUI } from "@/services/mappers";
import { useTrendingTracks } from "@/queries/useTrendingTracks";

export default function HomeView() {
  const { data, isLoading, error } = useTrendingTracks();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.length === 0)
    return <div>No featured track</div>;

  const ui = mapTrackToUI(data[0]);

  return (
    <main className="flex flex-col gap-6">
      <SearchBar />
      <HeroCard
        title={ui.title}
        artist={ui.artist}
        cover={ui.artwork}
        description="Trending now"
      />
    </main>
  );
}
