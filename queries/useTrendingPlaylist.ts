import { mapPlaylistToUI } from "@/services/playlist/mapper";
import { fetchTrendingPlaylists } from "@/services/playlist/trendingPlaylist";
import { useQuery } from "@tanstack/react-query";

export function useTrendingPlaylists() {
  return useQuery({
    queryKey: ["trending-playlists"],
    queryFn: fetchTrendingPlaylists,
    staleTime: 1000 * 60 * 30,
    select: (data) => data.map(mapPlaylistToUI),
  });
}
