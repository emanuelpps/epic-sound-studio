"use client";

import { handlePlay } from "@/lib/functions/handlePlay";
import { usePlayerStore } from "@/stores/playerStore";
import Image from "next/image";
import { motion } from "framer-motion";
import { RiPlayFill } from "react-icons/ri";

function formatTime(s: number) {
  if (!s || isNaN(s)) return "";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function QueuePanel() {
  const currentPlaylist = usePlayerStore((s) => s.currentPlaylist);
  const currentTrack    = usePlayerStore((s) => s.currentTrack);
  const play            = usePlayerStore((s) => s.play);

  if (!currentPlaylist) return null;

  const tracks = currentPlaylist.tracks;
  const currentIdx = tracks.findIndex((t) => t.trackId === currentTrack?.trackId);

  return (
    <aside className="flex flex-col gap-4 self-start sticky top-6">

      {/* Header */}
      <div className="relative pl-5">
        <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
        <h2 className="text-xl font-bold tracking-wide text-white uppercase">Queue</h2>
        <p className="text-sm text-white/40 mt-0.5">{tracks.length} tracks</p>
      </div>

      {/* Track list */}
      <div className="bg-[#120914]/60 backdrop-blur-md border border-[#f91fc3]/15 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(249,31,195,0.06)]">
        <div
          className="flex flex-col max-h-[calc(100vh-220px)] overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(249,31,195,0.2) transparent" }}
        >
          {tracks.map((track, i) => {
            const isActive = track.trackId === currentTrack?.trackId;
            const isPast   = i < currentIdx;

            return (
              <motion.button
                key={track.trackId}
                onClick={() => handlePlay(track.trackId, track.title, track.artist, play)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Math.min(i * 0.02, 0.3) }}
                className={`flex items-center gap-3 px-4 py-3 transition text-left w-full group border-b border-white/[0.04] last:border-0 ${
                  isActive
                    ? "bg-[#f91fc3]/10"
                    : isPast
                    ? "opacity-40 hover:opacity-70 hover:bg-white/5"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Artwork / index */}
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  {track.artwork ? (
                    <Image
                      src={track.artwork}
                      alt={track.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}

                  {/* Hover overlay */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <RiPlayFill size={16} className="text-white" />
                    </div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#f91fc3]/20 flex items-center justify-center">
                      <span className="flex gap-[3px] items-end h-4">
                        {[1, 2, 3].map((bar) => (
                          <span
                            key={bar}
                            className="w-[3px] bg-[#f91fc3] rounded-full"
                            style={{
                              height: `${40 + bar * 20}%`,
                              animation: `equalize 0.8s ease-in-out ${bar * 0.15}s infinite alternate`,
                            }}
                          />
                        ))}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? "text-[#f91fc3]" : "text-white/90"}`}>
                    {track.title}
                  </p>
                  <p className="text-xs text-white/40 truncate">{track.artist}</p>
                </div>

                {/* Duration */}
                {track.duration > 0 && (
                  <span className="text-xs text-white/25 shrink-0 font-mono">
                    {formatTime(track.duration)}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes equalize {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </aside>
  );
}
