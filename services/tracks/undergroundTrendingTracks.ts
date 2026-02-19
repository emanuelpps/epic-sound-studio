import { getAudiusHost } from "../audiusHost";
import { AudiusTrack } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function fetchUndergroundTrendingTracks(): Promise<AudiusTrack[]> {
  const host = await getAudiusHost();

  const res = await fetch(
    `${host}/v1/tracks/trending/underground?limit=20&app_name=${process.env.APP_NAME}`,
  );

  if (!res.ok) throw new Error("Tracks error");

  const json: AudiusResponse<AudiusTrack[]> = await res.json();
  return json.data;
}
