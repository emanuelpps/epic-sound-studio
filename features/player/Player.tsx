"use client";

import CenterGlowBackground from "@/shared/components/ui/Background/CenterGlowBackground";
import TrackPanel from "./components/TrackPanel";
import QueuePanel from "./components/QueuePanel";
import { usePlayerStore } from "@/stores/playerStore";

export default function Player() {
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);

  return (
    <section className="relative min-h-screen w-full text-white">
      <CenterGlowBackground />

      {isPlaylist ? (
        /* Two-column: track + queue */
        <div className="relative z-10 grid grid-cols-[1fr_340px] gap-6 p-6 min-h-screen">
          <TrackPanel />
          <QueuePanel />
        </div>
      ) : (
        /* Single track: full width, centred content */
        <div className="relative z-10 flex justify-center p-6 min-h-screen">
          <div className="w-full max-w-3xl">
            <TrackPanel />
          </div>
        </div>
      )}
    </section>
  );
}
