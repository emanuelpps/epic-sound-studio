import { getAudiusHost } from "../audiusHost";
import { AudiusTrack } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function searchTracks(query: string): Promise<AudiusTrack[]> {
  if (!query.trim()) return [];

  const host = await getAudiusHost();
  const params = new URLSearchParams({
    query: query.trim(),
    limit: "30",
    app_name: process.env.NEXT_PUBLIC_APP_NAME ?? "EpicSoundStudio",
  });

  const res = await fetch(`${host}/v1/search/tracks?${params}`);
  if (!res.ok) throw new Error("Search failed");

  const json: AudiusResponse<AudiusTrack[]> = await res.json();
  return json.data ?? [];
}
