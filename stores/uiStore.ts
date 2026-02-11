import { create } from "zustand";

type View = "home" | "search" | "library";

export const useUIStore = create<{
  view: View;
  setView: (v: View) => void;
}>((set) => ({
  view: "home",
  setView: (v) => set({ view: v }),
}));
