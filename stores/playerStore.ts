import { UiPlaylist } from "@/services/playlist/types";
import { create } from "zustand";
import { AudiusTrack } from "@/services/tracks/types";

export interface Track {
  trackId: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
  description: string;
  genre: string;
  duration: number;
  plays: number;
  likes: number;
  reposts: number;
  artwork: string;
}

interface PlayerState {
  trackData: AudiusTrack | null;
  currentPlaylist: UiPlaylist | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  isPlaylist: boolean;
  audioRef: HTMLAudioElement | null;

  setTrackData: (track: AudiusTrack | null) => void;
  setAudioRef: (el: HTMLAudioElement | null) => void;
  setIsPlaylist: (isPlaylist: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setProgress: (p: number) => void;
  setDuration: (d: number) => void;
  setCurrentTime: (t: number) => void;
  play: (track: Track) => void;
  toggle: () => void;
  setVolume: (v: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  trackData: null,
  currentPlaylist: null,
  isPlaying: false,
  volume: 0.8,
  isLoading: false,
  progress: 0,
  currentTime: 0,
  duration: 0,
  isPlaylist: false,
  audioRef: null,

  setTrackData: (track) => set({ trackData: track }),
  setAudioRef: (el) => set({ audioRef: el }),
  setProgress: (p) => set({ progress: p }),
  setDuration: (d) => set({ duration: d }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsPlaylist: (isPlaylist) => set({ isPlaylist }),
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
