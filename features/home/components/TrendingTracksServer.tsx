import { mapTrackToUI } from "@/services/mappers";
import { getTrendingTracks } from "@/services/tracks/trendingTracks";
import TrendingTracks from "./TrendingTracks";

export default async function TrendingTracksServer() {
  const result = await getTrendingTracks();

  if (!result.ok) {
    return <div>Error loading: {result.error}</div>;
  }

  const tracks = result.data.map(mapTrackToUI);

  return <TrendingTracks tracks={tracks} />;
}
