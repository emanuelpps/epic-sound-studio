
import { getAudiusHost } from "../audiusHost";
import { AudiusTrack } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export async function getTrack(trackId: string): Promise<AudiusTrack> {
  const host = await getAudiusHost();

  const res = await fetch(
    `${host}/v1/tracks/${trackId}?app_name=${process.env.APP_NAME}`
  );

  if (!res.ok) throw new Error("Track request failed");

  const json: AudiusResponse<AudiusTrack> = await res.json();

  if (!json.data) throw new Error("Track not found");

  return json.data;
}
