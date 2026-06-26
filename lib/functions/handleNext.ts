import { getTrackStreamUrl } from "@/services/tracks/streamTrack";
import { usePlayerStore } from "@/stores/playerStore";

export async function handleNext() {
  const { getNextTrack, play, setIsLoading } = usePlayerStore.getState();
  const next = getNextTrack();
  if (!next) return;
  setIsLoading(true);
  try {
    const url = await getTrackStreamUrl(next.trackId);
    play({ ...next, url });
  } finally {
    setIsLoading(false);
  }
}
