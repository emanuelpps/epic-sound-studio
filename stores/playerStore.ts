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

export type RepeatMode = "off" | "one" | "all";

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
  shuffle: boolean;
  repeat: RepeatMode;

  setTrackData: (track: AudiusTrack | null) => void;
  setAudioRef: (el: HTMLAudioElement | null) => void;
  setIsPlaylist: (isPlaylist: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setProgress: (p: number) => void;
  setDuration: (d: number) => void;
  setCurrentTime: (t: number) => void;
  setCurrentPlaylist: (playlist: UiPlaylist | null) => void;
  play: (track: Track) => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  increaseVolume: (step?: number) => void;
  decreaseVolume: (step?: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  getNextTrack: () => Track | null;
  getPrevTrack: () => Track | null;
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
  shuffle: false,
  repeat: "off",

  setTrackData: (track) => set({ trackData: track }),
  setAudioRef: (el) => set({ audioRef: el }),
  setProgress: (p) => set({ progress: p }),
  setDuration: (d) => set({ duration: d }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsPlaylist: (isPlaylist) => set({ isPlaylist }),
  setCurrentPlaylist: (playlist) =>
    set({ currentPlaylist: playlist, isPlaylist: !!playlist }),
  play: (track) => set({ currentTrack: track, isPlaying: true }),
  toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setVolume: (v) => set({ volume: Math.min(Math.max(v, 0), 1) }),
  increaseVolume: (step = 0.1) =>
    set((s) => ({ volume: Math.min(s.volume + step, 1) })),
  decreaseVolume: (step = 0.1) =>
    set((s) => ({ volume: Math.max(s.volume - step, 0) })),
  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  toggleRepeat: () =>
    set((s) => ({
      repeat:
        s.repeat === "off" ? "one" : s.repeat === "one" ? "all" : "off",
    })),
  getNextTrack: () => {
    const { currentTrack, currentPlaylist, shuffle } = get();
    if (!currentPlaylist || !currentTrack) return null;
    const tracks = currentPlaylist.tracks;
    if (tracks.length === 0) return null;
    if (shuffle) {
      const others = tracks.filter((t) => t.trackId !== currentTrack.trackId);
      return others.length > 0
        ? others[Math.floor(Math.random() * others.length)]
        : tracks[0];
    }
    const idx = tracks.findIndex((t) => t.trackId === currentTrack.trackId);
    return tracks[(idx + 1) % tracks.length];
  },
  getPrevTrack: () => {
    const { currentTrack, currentPlaylist } = get();
    if (!currentPlaylist || !currentTrack) return null;
    const tracks = currentPlaylist.tracks;
    if (tracks.length === 0) return null;
    const idx = tracks.findIndex((t) => t.trackId === currentTrack.trackId);
    return tracks[(idx - 1 + tracks.length) % tracks.length];
  },
}));
