import { UiPlaylist } from "@/services/playlist/types";
import { create } from "zustand";
import { AudiusTrack } from "@/services/tracks/types";
import { saveLikes, loadLikes } from "@/lib/localStorage";
import { addDbLike, removeDbLike } from "@/services/likes/likesSync";

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
  likedTracks: Set<string>;
  currentUserId: string | null;

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
  toggleLike: (trackId: string) => void;
  isTrackLiked: (trackId: string) => boolean;
  initializeLikes: () => void;
  setLikedTracks: (likes: Set<string>) => void;
  setCurrentUserId: (id: string | null) => void;
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
  likedTracks: new Set(),
  currentUserId: null,

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
  toggleLike: (trackId: string) => {
    set((s) => {
      const newLikes = new Set(s.likedTracks);
      if (newLikes.has(trackId)) newLikes.delete(trackId);
      else newLikes.add(trackId);
      saveLikes(newLikes);
      return { likedTracks: newLikes };
    });
    // Mirror to Supabase when signed in (fire-and-forget; localStorage stays the
    // offline cache so the UI is always instant and works logged-out too).
    const { currentUserId, likedTracks } = get();
    if (currentUserId) {
      if (likedTracks.has(trackId)) addDbLike(currentUserId, trackId);
      else removeDbLike(currentUserId, trackId);
    }
  },
  isTrackLiked: (trackId: string) => {
    return get().likedTracks.has(trackId);
  },
  initializeLikes: () => {
    // Only hydrate from localStorage when not signed in; the auth store owns
    // the liked set once a session exists (DB ∪ local).
    if (get().currentUserId) return;
    set({ likedTracks: loadLikes() });
  },
  setLikedTracks: (likes) => set({ likedTracks: likes }),
  setCurrentUserId: (id) => set({ currentUserId: id }),
}));
