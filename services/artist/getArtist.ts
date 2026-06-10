import { getAudiusHost } from "../audiusHost";

interface AudiusArtwork {
  "150x150"?: string;
  "480x480"?: string;
  "1000x1000"?: string;
}

export interface AudiusArtist {
  id: string;
  name: string;
  handle: string;
  is_verified: boolean;
  follower_count: number;
  profile_picture?: AudiusArtwork;
  bio?: string;
}

interface AudiusResponse<T> {
  data: T;
}

export async function getArtist(handle: string): Promise<AudiusArtist> {
  if (!handle) throw new Error("Artist handle required");

  const host = await getAudiusHost();

  const res = await fetch(
    `${host}/v1/users/handle/${handle}?app_name=${process.env.NEXT_PUBLIC_APP_NAME ?? "EpicSoundStudio"}`
  );

  if (!res.ok) throw new Error("Artist request failed");

  const json: AudiusResponse<AudiusArtist> = await res.json();

  if (!json.data) throw new Error("Artist not found");

  return json.data;
}
