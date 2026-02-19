import { getAudiusHost } from "../audiusHost";

export async function getTrackStreamUrl(trackId: string): Promise<string> {
  const host = await getAudiusHost();

  return `${host}/v1/tracks/${trackId}/stream?app_name=${process.env.APP_NAME}`;
}
