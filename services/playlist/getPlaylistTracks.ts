import { getAudiusHost } from "../audiusHost";
import { AudiusTrack } from "../tracks/types";

interface AudiusResponse<T> {
  data: T;
}

export async function getPlaylistTracks(playlistId: string): Promise<AudiusTrack[]> {
  if (!playlistId) return [];

  const host = await getAudiusHost();
  const params = new URLSearchParams({
    limit: "100",
    offset: "0",
    app_name: process.env.NEXT_PUBLIC_APP_NAME ?? "EpicSoundStudio",
  });

  const res = await fetch(
    `${host}/v1/playlists/${playlistId}/tracks?${params}`
  );

  if (!res.ok) throw new Error("Playlist tracks request failed");

  const json: AudiusResponse<AudiusTrack[]> = await res.json();

  return json.data ?? [];
}
