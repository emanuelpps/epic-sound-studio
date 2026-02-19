import { create } from "zustand";

export interface Track {
  trackId: string;
  title: string;
  artist: string;
  url: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  progress: number;
  currentTime: number;
  duration: number;
  setProgress: (p: number) => void;
  setDuration: (d: number) => void;
  setCurrentTime: (t: number) => void;

  play: (track: Track) => void;
  toggle: () => void;
  setVolume: (v: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  progress: 0,
  currentTime: 0,
  duration: 0,
  setProgress: (p) => set({ progress: p }),
  setDuration: (d) => set({ duration: d }),
  setCurrentTime: (t) => set({ currentTime: t }),

  play: (track) =>
    set({
      currentTrack: track,
      isPlaying: true,
    }),

  toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),

  setVolume: (v) => set({ volume: Math.min(Math.max(v, 0), 1) }),

  increaseVolume: (step = 0.1) =>
    set((s) => ({ volume: Math.min(s.volume + step, 1) })),

  decreaseVolume: (step = 0.1) =>
    set((s) => ({ volume: Math.max(s.volume - step, 0) })),
}));
