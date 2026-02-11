import { create } from "zustand";

interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;

  play: (track: Track) => void;
  toggle: () => void;
  setVolume: (v: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,

  play: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
    }),

  toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),

  setVolume: (v) => set({ volume: v }),
}));
