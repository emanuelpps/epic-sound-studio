"use client";

import { usePlayerStore } from "@/stores/playerStore";

export default function PlaylistContainer() {
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);
  const currentPlaylist = usePlayerStore((s) => s.currentPlaylist);

  if (!isPlaylist || !currentPlaylist) return null;

  return (
    <aside className="w-[380px] bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-[#a100ff]/40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold tracking-widest text-pink-400">
          UP NEXT
        </h2>
        <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">
          AUTO-PLAY ON
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {currentPlaylist.tracks.map((track, index) => (
          <div
            key={track.trackId}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition ${
              index === 0
                ? "bg-gradient-to-r from-[#f91fc3]/40 to-[#5b5bff]/40 border border-pink-500"
                : "hover:bg-white/5"
            }`}
          >
            <div className="w-14 h-14 bg-gray-700 rounded-md" />
            <div className="flex flex-col">
              <span className="font-medium">{track.title}</span>
              <span className="text-sm text-gray-400">{track.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
