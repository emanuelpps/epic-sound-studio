import { useQuery } from "@tanstack/react-query";
import { getTrack } from "@/services/tracks/getTrack";
import { mapTrackToUI } from "@/services/mappers";

export function useTrack(trackId: string) {
  return useQuery({
    queryKey: ["track", trackId],
    queryFn: () => getTrack(trackId).then(mapTrackToUI),
    staleTime: 1000 * 60 * 30,
    enabled: !!trackId,
  });
}
