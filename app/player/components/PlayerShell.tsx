"use client";

import { lazy, Suspense } from "react";
import { useUIStore } from "@/stores/uiStore";

const HomeView = lazy(() => import("@/features/views/HomeView"));
const SearchView = lazy(() => import("@/features/views/SearchView"));
const LibraryView = lazy(() => import("@/features/views/LibraryView"));
const LikesView = lazy(() => import("@/features/views/LikesView"));
const PlayerView = lazy(() => import("@/features/views/PlayerView"));
const GenreView = lazy(() => import("@/features/views/GenreView"));
const PlaylistView = lazy(() => import("@/features/views/PlaylistView"));
const ArtistView = lazy(() => import("@/features/views/ArtistView"));

function ViewLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-[#f91fc3]"
            style={{
              animation: `viewLoaderBounce 0.9s ease-in-out infinite`,
              animationDelay: `${i * 0.18}s`,
              boxShadow: "0 0 8px rgba(249,31,195,0.9)",
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes viewLoaderBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function PlayerShell() {
  const view = useUIStore((s) => s.view);

  return (
    <Suspense fallback={<ViewLoader />}>
      {view === "search"   && <SearchView />}
      {view === "library"  && <LibraryView />}
      {view === "likes"    && <LikesView />}
      {view === "player"   && <PlayerView />}
      {view === "genre"    && <GenreView />}
      {view === "playlist" && <PlaylistView />}
      {view === "artist"   && <ArtistView />}
      {view === "home"     && <HomeView />}
    </Suspense>
  );
}
