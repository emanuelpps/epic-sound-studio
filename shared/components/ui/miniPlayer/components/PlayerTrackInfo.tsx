import { usePlayerStore } from "@/stores/playerStore";
import handleSeek from "@/lib/functions/handleSeek";
import { useUIStore } from "@/stores/uiStore";

export function PlayerTrackInfo() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const progress = usePlayerStore((s) => s.progress);
  const duration = usePlayerStore((s) => s.duration);
  const setView = useUIStore((s) => s.setView);

  return (
    <div
      className="flex flex-col min-w-[180px] cursor-pointer"
      onClick={() => setView("player")}
    >
      <h3 className="text-white font-semibold line-clamp-1">
        {currentTrack?.title}
      </h3>
      <p className="text-white/50 text-sm truncate">{currentTrack?.artist}</p>
      <div className="relative h-1 mt-3 w-48 group">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={(e) => handleSeek(e, duration)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
        <div className="absolute inset-0 bg-white/10 rounded-full" />
        <div
          className="absolute inset-y-0 left-0 bg-[#f91fc3] rounded-full shadow-[0_0_10px_rgba(249,31,195,0.6)] transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>
    </div>
  );
}
