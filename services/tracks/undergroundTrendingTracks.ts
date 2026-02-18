import { AudiusTrack } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function fetchUndergroundTrendingTracks(): Promise<AudiusTrack[]> {
  const hostRes = await fetch("https://api.audius.co");
  if (!hostRes.ok) throw new Error("Host error");

  const hostJson: AudiusResponse<string[]> = await hostRes.json();
  const host = hostJson.data?.[0];
  if (!host) throw new Error("No host");

  const res = await fetch(
    `${host}/v1/tracks/trending/underground?limit=20&app_name=${process.env.APP_NAME}`,
  );

  if (!res.ok) throw new Error("Tracks error");

  const json: AudiusResponse<AudiusTrack[]> = await res.json();
  return json.data;
}
