import { create } from "zustand";

export type View =
  | "home"
  | "search"
  | "library"
  | "likes"
  | "player"
  | "genre"
  | "playlist";

type UIState = {
  view: View;
  setView: (v: View) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  view: "home",
  setView: (v) => set({ view: v }),
  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
}));
