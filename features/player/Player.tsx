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
      <div
        className="relative z-10 min-h-screen p-6"
        style={{
          display: isPlaylist ? "grid" : "flex",
          gridTemplateColumns: isPlaylist ? "1fr 340px" : undefined,
          justifyContent: isPlaylist ? undefined : "center",
          gap: "1.5rem",
        }}
      >
        <TrackPanel />
        {isPlaylist && <QueuePanel />}
      </div>
    </section>
  );
}
