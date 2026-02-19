import { AudiusTrack } from "./tracks/types";

interface AudiusResponse<T> {
  data: T;
}

let cachedHost: string | null = null;

export async function getAudiusHost(): Promise<string> {
  if (cachedHost) return cachedHost;

  const res = await fetch("https://api.audius.co");
  if (!res.ok) throw new Error("Failed to fetch Audius host");

  const json: AudiusResponse<string[]> = await res.json();

  const host = json.data?.[0];
  if (!host) throw new Error("No Audius host found");

  cachedHost = host;

  return host;
}

