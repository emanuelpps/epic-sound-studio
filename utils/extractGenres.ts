import { AudiusTrack } from "@/services/tracks/types";

export function extractGenres(tracks: AudiusTrack[]): string[] {
  const genres = new Set<string>();

  tracks.forEach((track) => {
    if (track.genre) {
      genres.add(track.genre);
    }
  });

  return Array.from(genres);
}
