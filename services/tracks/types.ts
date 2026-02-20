// =============================
// AUDIUS API TYPES
// =============================

export interface AudiusArtwork {
  "150x150"?: string;
  "480x480"?: string;
  "1000x1000"?: string;
}

export interface AudiusUser {
  id: string;
  name: string;
  handle: string;
  profile_picture?: AudiusArtwork;
  follower_count: number;
  followee_count: number;
  is_verified: boolean;
}

export interface AudiusTrack {
  id: string;
  title: string;
  description: string | null;
  genre: string | null;
  mood?: string | null;

  duration: number;
  play_count: number;
  favorite_count: number;
  repost_count: number;

  downloadable: boolean;
  is_streamable: boolean;

  permalink: string;
  tags?: string;

  artwork?: AudiusArtwork;
  user: AudiusUser;
}

// =============================
// UI TYPES
// =============================

export interface UiTrack {
  description: string | undefined;
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration: number;
  plays: number;
  likes: number;
  genre: string;
}

export interface UiPlaylist {
  id: string;
  title: string;
  cover: string;
  tracksCount: number;
  likes: number;
  genre: string;
}

export interface UiUser {
  id: string;
  handle: string;
  avatar: string;
  name: string;
  followers: number;
  following: number;
}
