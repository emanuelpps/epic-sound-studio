import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "@/services/playlist/getPlaylist";
import { mapPlaylistToUI } from "@/services/playlist/mapper";

export function usePlaylistDetail(playlistId: string | null) {
  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylist(playlistId ?? "").then(mapPlaylistToUI),
    staleTime: 1000 * 60 * 30,
    enabled: !!playlistId && playlistId.trim().length > 0,
  });
}
