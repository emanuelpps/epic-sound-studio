import { usePlayerStore } from "@/stores/playerStore";

export function handlePause() {
  const toggle = usePlayerStore.getState().toggle;
  const isPlaying = usePlayerStore.getState().isPlaying;

  if (isPlaying) {
    toggle();
  }
}
