// =============================
// 🎧 AUDIUS PLAYLIST TYPES
// =============================

import { Track } from "@/stores/playerStore";

export interface AudiusArtwork {
  "150x150"?: string;
  "480x480"?: string;
  "1000x1000"?: string;
}

export interface AudiusUser {
  playlist_count: number;
  id: string;
  name: string;
  handle: string;
  is_verified: boolean;
  follower_count: number;
  profile_picture?: AudiusArtwork;
}

export interface AudiusPlaylist {
  id: string;
  playlist_name: string;
  description: string | null;
  permalink: string;

  artwork?: AudiusArtwork;

  is_album: boolean;

  repost_count: number;
  favorite_count: number;
  total_play_count: number;

  playlist_count: number;
  user: AudiusUser;
}

export interface UiPlaylist {
  id: string;
  title: string;
  description?: string;
  cover: string;
  likes: number;
  reposts: number;
  plays: number;
  playlist_count: number;
  isAlbum: boolean;
  author: string;
  authorHandle: string;
  isVerified: boolean;
  permalink: string;
  tracks: Track[];
}
