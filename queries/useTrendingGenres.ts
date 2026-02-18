import { useQuery } from "@tanstack/react-query";
import { fetchTrendingTracks } from "@/services/tracks/trendingTracks";

export function useTrendingGenres() {
  return useQuery({
    queryKey: ["trending-tracks"],
    queryFn: fetchTrendingTracks,
    staleTime: 1000 * 60 * 30,
    select: (tracks) => {
      const genres = new Set<string>();

      tracks.forEach((track) => {
        if (track.genre) genres.add(track.genre);
      });

      return Array.from(genres);
    },
  });
}
