import { getTrackStreamUrl } from "@/services/tracks/streamTrack";
import { usePlayerStore } from "@/stores/playerStore";

export async function handlePrev() {
  const { getPrevTrack, currentTime, audioRef, play, setIsLoading } =
    usePlayerStore.getState();

  // If more than 3s played, restart current track instead of going prev
  if (currentTime > 3 && audioRef) {
    audioRef.currentTime = 0;
    return;
  }

  const prev = getPrevTrack();
  if (!prev) return;
  setIsLoading(true);
  try {
    const url = await getTrackStreamUrl(prev.trackId);
    play({ ...prev, url });
  } finally {
    setIsLoading(false);
  }
}
