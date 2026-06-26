import { useQuery } from "@tanstack/react-query";
import { getTrendingByGenre } from "@/services/tracks/getTrendingByGenre";
import { mapTrackToUI } from "@/services/mappers";

export function useTrendingByGenre(genre: string | null) {
  return useQuery({
    queryKey: ["genre", genre],
    queryFn: () => getTrendingByGenre(genre ?? ""),
    select: (data) => data.map(mapTrackToUI),
    enabled: !!genre && genre.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
