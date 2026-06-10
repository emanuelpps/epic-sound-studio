import { getAudiusHost } from "../audiusHost";
import { AudiusTrack } from "../tracks/types";

interface AudiusResponse<T> {
  data: T;
}

export async function getArtistTracks(userId: string): Promise<AudiusTrack[]> {
  if (!userId) return [];

  const host = await getAudiusHost();
  const params = new URLSearchParams({
    limit: "30",
    offset: "0",
    sort: "date",
    app_name: process.env.NEXT_PUBLIC_APP_NAME ?? "EpicSoundStudio",
  });

  const res = await fetch(
    `${host}/v1/users/${userId}/tracks?${params}`
  );

  if (!res.ok) throw new Error("Artist tracks request failed");

  const json: AudiusResponse<AudiusTrack[]> = await res.json();

  return json.data ?? [];
}
