import { getAudiusHost } from "../audiusHost";
import { AudiusPlaylist } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function getPlaylist(playlistId: string): Promise<AudiusPlaylist> {
  if (!playlistId) throw new Error("Playlist ID required");

  const host = await getAudiusHost();

  const res = await fetch(
    `${host}/v1/playlists/${playlistId}?app_name=${process.env.NEXT_PUBLIC_APP_NAME ?? "EpicSoundStudio"}`
  );

  if (!res.ok) throw new Error("Playlist request failed");

  const json: AudiusResponse<AudiusPlaylist> = await res.json();

  if (!json.data) throw new Error("Playlist not found");

  return json.data;
}
