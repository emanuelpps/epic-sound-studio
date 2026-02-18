import { AudiusPlaylist } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function fetchTrendingPlaylists(): Promise<AudiusPlaylist[]> {
  const hostRes = await fetch("https://api.audius.co");
  if (!hostRes.ok) throw new Error("Host error");

  const hostJson: AudiusResponse<string[]> = await hostRes.json();
  const host = hostJson.data?.[0];
  if (!host) throw new Error("No host available");

  const res = await fetch(
    `${host}/v1/playlists/trending?limit=20&app_name=${process.env.NEXT_PUBLIC_APP_NAME}`
  );

  if (!res.ok) throw new Error("Playlists error");

  const json: AudiusResponse<AudiusPlaylist[]> = await res.json();

  return json.data;
}
