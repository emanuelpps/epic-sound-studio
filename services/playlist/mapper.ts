import { AudiusPlaylist, UiPlaylist } from "./types";

export function mapPlaylistToUI(playlist: AudiusPlaylist): UiPlaylist {
  return {
    id: playlist.id,
    title: playlist.playlist_name,
    description: playlist.description ?? undefined,

    cover: playlist.artwork?.["150x150"] || playlist.artwork?.["480x480"] || "No Image",

    likes: playlist.favorite_count ?? 0,
    reposts: playlist.repost_count ?? 0,
    plays: playlist.total_play_count ?? 0,
    playlist_count: playlist.user.playlist_count ?? 0,

    isAlbum: playlist.is_album ?? false,

    author: playlist.user?.name ?? "Unknown",
    authorHandle: playlist.user?.handle ?? "",
    isVerified: playlist.user?.is_verified ?? false,

    permalink: playlist.permalink,
  };
}
