import { AudiusTrack } from "./tracks/types";

export interface UITrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  description?: string;
}

export function mapTrackToUI(track: AudiusTrack): UITrack {
  return {
    id: track.id,
    title: track.title,
    artist: track.user.name,
    cover: track.artwork["480x480"],
  };
}
