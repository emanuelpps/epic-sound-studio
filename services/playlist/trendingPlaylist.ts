import { getAudiusHost } from "../audiusHost";
import { AudiusPlaylist } from "./types";

interface AudiusResponse<T> {
  data: T;
}
export async function fetchTrendingPlaylists(): Promise<AudiusPlaylist[]> {
  const host = await getAudiusHost();

  const res = await fetch(
    `${host}/v1/playlists/trending?limit=20&app_name=${process.env.NEXT_PUBLIC_APP_NAME}`,
  );

  if (!res.ok) throw new Error("Playlists error");

  const json: AudiusResponse<AudiusPlaylist[]> = await res.json();

  return json.data;
}
