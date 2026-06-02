"use client";

import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import Image from "next/image";

export default function PlaylistContainer() {
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);
  const currentPlaylist = usePlayerStore((s) => s.currentPlaylist);
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const play = usePlayerStore((s) => s.play);

  if (!isPlaylist || !currentPlaylist) return null;

  return (
    <aside className="w-[380px] bg-black/40 backdrop-blur-xl rounded-3xl p-6 border border-[#a100ff]/40 self-start sticky top-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold tracking-widest text-pink-400">
          UP NEXT
        </h2>
        <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">
          {currentPlaylist.tracks.length} TRACKS
        </span>
      </div>

      <div className="flex flex-col gap-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#f91fc3]/30 scrollbar-track-transparent">
        {currentPlaylist.tracks.map((track) => {
          const isActive = track.trackId === currentTrack?.trackId;
          return (
            <button
              key={track.trackId}
              onClick={() =>
                handlePlay(track.trackId, track.title, track.artist, play)
              }
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition text-left w-full ${
                isActive
                  ? "bg-gradient-to-r from-[#f91fc3]/30 to-[#5b5bff]/30 border border-pink-500/60"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                {track.artwork ? (
                  <Image
                    src={track.artwork}
                    alt={track.title}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#f91fc3]/20 to-[#5b5bff]/20" />
                )}
                {isActive && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#f91fc3] animate-ping" />
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`font-medium truncate ${isActive ? "text-[#f91fc3]" : "text-white"}`}
                >
                  {track.title}
                </span>
                <span className="text-sm text-gray-400 truncate">
                  {track.artist}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
