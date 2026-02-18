import { useTrendingTracks } from "@/queries/useTrendingTracks";
import { mapTrackToUI } from "@/services/mappers";
import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import { HeroCard } from "@/shared/components/ui/Cards/HeroCard";
import { HeroCardSkeleton } from "@/shared/components/ui/Skeletons/HeroCardSkeleton";
import { SearchBarSkeleton } from "@/shared/components/ui/Skeletons/SearchBarSkeleton";

export default function HomeView() {
  const { data, isLoading, error } = useTrendingTracks();

  if (isLoading)
    return (
      <main className="flex flex-col gap-6">
        <SearchBarSkeleton />
        <HeroCardSkeleton />
      </main>
    );

  if (error || !data || data.length === 0) return <div>No featured track</div>;

  const ui = mapTrackToUI(data[0]);

  return (
    <main className="flex flex-col gap-6">
      <SearchBar />
      <HeroCard
        title={ui.title}
        artist={ui.artist}
        cover={ui.artwork}
        description={ui.description}
      />
    </main>
  );
}
