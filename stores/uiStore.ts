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
};

export const useUIStore = create<UIState>((set) => ({
  view: "home",
  setView: (v) => set({ view: v }),
}));
