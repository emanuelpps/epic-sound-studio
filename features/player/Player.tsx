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
        /* Mobile: single column, scrolls vertically (track then queue).
           Desktop (lg+): two-column grid, no scroll — everything fits.
           minmax(0,…) on both axes removes the implicit `auto` minimum of
           grid tracks (1fr === minmax(auto,1fr)) which would otherwise let
           TrackPanel's min-content inflate the row past the viewport and clip
           the controls. */
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[minmax(0,1fr)] gap-4 lg:gap-6 p-4 sm:px-6 sm:pt-6 pb-8 lg:pb-10 h-full overflow-y-auto lg:overflow-hidden">
          <TrackPanel />
          <QueuePanel />
        </div>
      ) : (
        /* Single track: fills the full viewport height; scrolls only if a very
           short viewport can't fit the card. */
        <div className="relative z-10 p-4 sm:px-6 sm:pt-6 pb-8 sm:pb-10 h-full flex flex-col overflow-y-auto lg:overflow-hidden">
          <TrackPanel />
        </div>
      )}
    </section>
  );
}
