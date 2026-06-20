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

  if (error || !data || data.length === 0)
    return (
      <main className="flex flex-col gap-6">
        <SearchBar />
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-[#120914]/60 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white/80">No featured track right now</p>
          <p className="text-sm text-white/40">Trending data is unavailable — try again in a moment.</p>
        </div>
      </main>
    );

  const ui = mapTrackToUI(data[0]);

  return (
    <main className="flex flex-col gap-6">
      <SearchBar />
      <HeroCard
        trackId={ui.id}
        title={ui.title}
        artist={ui.artist}
        cover={ui.artwork}
        description={ui.description}
      />
    </main>
  );
}
