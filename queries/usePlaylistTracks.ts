import { useQuery } from "@tanstack/react-query";
import { getPlaylistTracks } from "@/services/playlist/getPlaylistTracks";
import { mapTrackToUI } from "@/services/mappers";

export function usePlaylistTracks(playlistId: string | null) {
  return useQuery({
    queryKey: ["playlist-tracks", playlistId],
    queryFn: () => getPlaylistTracks(playlistId ?? "").then(tracks => tracks.map(mapTrackToUI)),
    staleTime: 1000 * 60 * 30,
    enabled: !!playlistId && playlistId.trim().length > 0,
  });
}
