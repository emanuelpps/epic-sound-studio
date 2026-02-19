import { getTrackStreamUrl } from "@/services/tracks/streamTrack";
import { Track, usePlayerStore } from "@/stores/playerStore";

export async function handlePlay(
  trackId: string,
  title: string,
  artist: string,
  play: (t: Track) => void,
) {
  const setIsLoading = usePlayerStore.getState().setIsLoading;
  setIsLoading(true);
  try {
    const streamUrl = await getTrackStreamUrl(trackId);
    play({ trackId, title, artist, url: streamUrl });
  } finally {
    setIsLoading(false);
  }
}
