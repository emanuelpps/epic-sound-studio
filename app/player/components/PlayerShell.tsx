"use client";

import GenreView from "@/features/views/GenreView";
import HomeView from "@/features/views/HomeView";
import LibraryView from "@/features/views/LibraryView";
import PlayerView from "@/features/views/PlayerView";
import PlaylistView from "@/features/views/PlaylistView";
import SearchView from "@/features/views/SearchView";
import { useUIStore } from "@/stores/uiStore";

export default function PlayerShell() {
  const view = useUIStore((s) => s.view);

  if (view === "search") return <SearchView />;
  if (view === "library") return <LibraryView />;
  if (view === "player") return <PlayerView />;
  if (view === "genre") return <GenreView />;
  if (view === "playlist") return <PlaylistView />;
  return <HomeView />;
}
