import { getAudiusHost } from "../audiusHost";
import { AudiusTrack } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function getTrendingByGenre(genre: string): Promise<AudiusTrack[]> {
  if (!genre.trim()) return [];

  const host = await getAudiusHost();
  const params = new URLSearchParams({
    genre: genre.trim(),
    limit: "30",
    offset: "0",
    app_name: process.env.NEXT_PUBLIC_APP_NAME ?? "EpicSoundStudio",
  });

  const res = await fetch(`${host}/v1/tracks/trending?${params}`);
  if (!res.ok) throw new Error("Genre tracks request failed");

  const json: AudiusResponse<AudiusTrack[]> = await res.json();
  return json.data ?? [];
}
