import { getTrendingTracks } from "@/services/tracks/trendingTracks";
import { mapTrackToUI } from "@/services/mappers";
import { HeroCard } from "@/shared/components/ui/Cards/HeroCard";

export default async function FeaturedHeroServer() {
  const result = await getTrendingTracks();

  if (!result.ok || result.data.length === 0) {
    return <div>No featured track</div>;
  }

  const first = result.data[0];
  const ui = mapTrackToUI(first);

  return (
    <HeroCard
      title={ui.title}
      artist={ui.artist}
      cover={ui.cover}
      description={first.description}
    />
  );
}
