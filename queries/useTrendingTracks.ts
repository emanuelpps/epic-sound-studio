import { useQuery } from "@tanstack/react-query";
import { fetchTrendingTracks } from "@/services/tracks/trendingTracks";

export function useTrendingTracks() {
  return useQuery({
    queryKey: ["trending-tracks"],
    queryFn: fetchTrendingTracks,
    staleTime: 1000 * 60 * 30,
  });
}
