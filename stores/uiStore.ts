import { create } from "zustand";

export type View =
  | "home"
  | "search"
  | "library"
  | "likes"
  | "player"
  | "genre"
  | "playlist"
  | "artist";

type UIState = {
  view: View;
  setView: (v: View) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
  selectedPlaylistId: string | null;
  setSelectedPlaylistId: (id: string | null) => void;
  selectedArtistHandle: string | null;
  selectedArtistId: string | null;
  setSelectedArtist: (handle: string | null, id: string | null) => void;
};

export const useUIStore = create<UIState>((set) => ({
  view: "home",
  setView: (v) => set({ view: v }),
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  selectedGenre: null,
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  selectedPlaylistId: null,
  setSelectedPlaylistId: (id) => set({ selectedPlaylistId: id }),
  selectedArtistHandle: null,
  selectedArtistId: null,
  setSelectedArtist: (handle, id) => set({ selectedArtistHandle: handle, selectedArtistId: id }),
}));
