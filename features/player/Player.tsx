"use client";

import CenterGlowBackground from "@/shared/components/ui/Background/CenterGlowBackground";
import TrackPanel from "./components/TrackPanel";
import QueuePanel from "./components/QueuePanel";
import { usePlayerStore } from "@/stores/playerStore";

export default function Player() {
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);

  return (
    <section className="relative h-full w-full text-white overflow-hidden">
      <CenterGlowBackground />

      {isPlaylist ? (
        /* Two-column: track + queue — scrollable if content overflows */
        <div className="relative z-10 grid grid-cols-[1fr_340px] grid-rows-[1fr] gap-6 px-6 pt-6 pb-10 h-full">
          <TrackPanel />
          <QueuePanel />
        </div>
      ) : (
        /* Single track: fills the full viewport height, no scroll */
        <div className="relative z-10 px-6 pt-6 pb-10 h-full flex flex-col overflow-hidden">
          <TrackPanel />
        </div>
      )}
    </section>
  );
}
