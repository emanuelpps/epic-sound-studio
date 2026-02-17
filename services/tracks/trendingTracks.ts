import { AudiusTrack } from "./types";

interface AudiusResponse<T> {
  data: T;
}

export type ServiceResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const REVALIDATE_30_MIN = 1800;

export async function getTrendingTracks(): Promise<
  ServiceResult<AudiusTrack[]>
> {
  try {
    const hostRes = await fetch("https://api.audius.co", {
      next: { revalidate: REVALIDATE_30_MIN },
    });

    if (!hostRes.ok) {
      return { ok: false, error: "No se pudo obtener host de Audius" };
    }

    const hostJson: AudiusResponse<string[]> = await hostRes.json();
    const host = hostJson.data?.[0];

    if (!host) {
      return { ok: false, error: "Audius no devolvió hosts" };
    }
    const res = await fetch(
      `${host}/v1/tracks/trending?limit=20&app_name=${process.env.APP_NAME}`,
      {
        next: { revalidate: REVALIDATE_30_MIN },
      },
    );

    if (!res.ok) {
      return { ok: false, error: "Error loading trending tracks" };
    }

    const json: AudiusResponse<AudiusTrack[]> = await res.json();

    if (!json.data || json.data.length === 0) {
      return { ok: false, error: "No tracks available" };
    }

    return { ok: true, data: json.data };
  } catch (err: unknown) {
    console.error(err);

    return {
      ok: false,
      error: "Unexpected error loading tracks",
    };
  }
}
