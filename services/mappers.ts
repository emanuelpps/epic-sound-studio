import { AudiusTrack, UiTrack } from "./tracks/types";


export function mapTrackToUI(track: AudiusTrack): UiTrack {
  return {
    id: track.id,
    title: track.title,
    artist: track.user?.name ?? "Unknown Artist",

    artwork:
      track.artwork?.["480x480"] ||
      track.artwork?.["150x150"] ||
      "",

    duration: track.duration ?? 0,
    plays: track.play_count ?? 0,
    likes: track.favorite_count ?? 0,
    genre: track.genre ?? "Unknown",
  };
}
