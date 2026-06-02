import { useQuery } from "@tanstack/react-query";
import { searchTracks } from "@/services/tracks/searchTracks";
import { mapTrackToUI } from "@/services/mappers";

export function useSearchTracks(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchTracks(query),
    select: (data) => data.map(mapTrackToUI),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
