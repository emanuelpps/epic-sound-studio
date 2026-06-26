import { getTrackStreamUrl } from "@/services/tracks/streamTrack";
import { Track, usePlayerStore } from "@/stores/playerStore";

export async function handlePlay(
  trackId: string,
  title: string,
  artist: string,
  play: (t: Track) => void,
) {
  const { setIsLoading, trackData } = usePlayerStore.getState();
  setIsLoading(true);
  try {
    const streamUrl = await getTrackStreamUrl(trackId);
    const artwork =
      trackData?.artwork?.["480x480"] ??
      trackData?.artwork?.["150x150"] ??
      "";
    play({
      trackId,
      title,
      artist,
      url: streamUrl,
      cover: artwork,
      artwork,
      description: trackData?.description ?? "",
      genre: trackData?.genre ?? "",
      duration: trackData?.duration ?? 0,
      plays: trackData?.play_count ?? 0,
      likes: trackData?.favorite_count ?? 0,
      reposts: trackData?.repost_count ?? 0,
    });
  } finally {
    setIsLoading(false);
  }
}
