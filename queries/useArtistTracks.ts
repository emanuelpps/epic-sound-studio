import { useQuery } from "@tanstack/react-query";
import { getArtistTracks } from "@/services/artist/getArtistTracks";
import { mapTrackToUI } from "@/services/mappers";

export function useArtistTracks(userId: string | null) {
  return useQuery({
    queryKey: ["artist-tracks", userId],
    queryFn: () => getArtistTracks(userId ?? "").then(tracks => tracks.map(mapTrackToUI)),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId && userId.trim().length > 0,
  });
}
