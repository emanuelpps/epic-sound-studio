type AudiusResponse<T> = {
  data: T;
};

let cachedHost: string | null = null;
let lastHostFetch = 0;

async function resolveHost(): Promise<string> {
  const now = Date.now();

  if (cachedHost && now - lastHostFetch < 15 * 60 * 1000) {
    return cachedHost;
  }

  const res = await fetch("https://api.audius.co", {
    cache: "no-store",
  });

  const json = await res.json();

  cachedHost = json.data[0];
  lastHostFetch = now;

  return cachedHost!;
}

async function audiusFetch<T>(path: string): Promise<T> {
  const host = await resolveHost();

  try {
    const res = await fetch(host + path, {
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error("Audius error");

    return res.json();
  } catch {
    const res = await fetch("https://api.audius.co" + path);
    if (!res.ok) throw new Error("Audius fallback error");
    return res.json();
  }
}

export const audiusClient = {
  async getTrending(limit = 20) {
    return audiusFetch<AudiusResponse<string[]>>(
      `/v1/tracks/trending?limit=${limit}`,
    );
  },

  async searchPlaylistsByGenre(
    genre: string,
    limit = 20,
    sort: "popular" | "recent" | "relevant" = "popular",
  ) {
    const g = encodeURIComponent(genre);

    return audiusFetch<AudiusResponse<string[]>>(
      `/v1/playlists/search?genre=${g}&limit=${limit}&sort_method=${sort}`,
    );
  },

  async getUser(handle: string) {
    return audiusFetch<AudiusResponse<string[]>>(
      `/v1/users/handle/${encodeURIComponent(handle)}`,
    );
  },

  async getTrack(id: string) {
    return audiusFetch<AudiusResponse<string[]>>(`/v1/tracks/${id}`);
  },
};
