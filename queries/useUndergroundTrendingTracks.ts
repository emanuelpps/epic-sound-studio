
import { fetchUndergroundTrendingTracks } from "@/services/tracks/undergroundTrendingTracks";
import { useQuery } from "@tanstack/react-query";


export function useUndergroundTrendingTracks() {
  return useQuery({
    queryKey: ["underground-trending-tracks"],
    queryFn: fetchUndergroundTrendingTracks,
    staleTime: 1000 * 60 * 30,
  });
}
