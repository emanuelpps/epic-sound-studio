"use client";

import HomeView from "@/features/views/HomeView";
import LibraryView from "@/features/views/LibraryView";
import SearchView from "@/features/views/SearchView";
import { useUIStore } from "@/stores/uiStore";

export default function PlayerShell() {
  const view = useUIStore((s) => s.view);

  if (view === "search") return <SearchView />;
  if (view === "library") return <LibraryView />;
  return <HomeView />;
}
