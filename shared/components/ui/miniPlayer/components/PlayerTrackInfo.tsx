"use client";

import { usePlayerStore } from "@/stores/playerStore";
import handleSeek from "@/lib/functions/handleSeek";
import { useUIStore } from "@/stores/uiStore";
import { TbArrowsDiagonal } from "react-icons/tb";
import { useRef, useEffect, useState } from "react";

function MarqueeText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;
    setShouldScroll(textEl.scrollWidth > container.clientWidth);
  }, [text]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <span
        ref={textRef}
        className={`inline-block whitespace-nowrap ${className} ${
          shouldScroll ? "animate-marquee" : ""
        }`}
      >
        {text}
        {shouldScroll && (
          <span className="inline-block px-8" aria-hidden>
            {text}
          </span>
        )}
      </span>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 10s linear infinite;
          animation-delay: 1.5s;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export function PlayerTrackInfo() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const progress = usePlayerStore((s) => s.progress);
  const duration = usePlayerStore((s) => s.duration);
  const setView = useUIStore((s) => s.setView);

  return (
    <div className="flex flex-col flex-1 min-w-0 gap-0.5">
      {/* Title + expand icon */}
      <button
        onClick={() => setView("player")}
        className="flex items-center gap-1.5 group/expand text-left w-full min-w-0"
        title="Open full player"
      >
        <div className="flex-1 min-w-0">
          <MarqueeText
            text={currentTrack?.title ?? ""}
            className="text-white font-semibold text-sm group-hover/expand:text-[#f91fc3] transition-colors"
          />
        </div>
        <TbArrowsDiagonal className="text-white/30 group-hover/expand:text-[#f91fc3] transition-colors shrink-0 text-sm ml-1" />
      </button>

      {/* Artist */}
      <div className="min-w-0 w-full">
        <MarqueeText
          text={currentTrack?.artist ?? ""}
          className="text-white/50 text-xs"
        />
      </div>

      {/* Progress bar */}
      <div
        className="relative h-1 mt-2 w-full group"
        onClick={(e) => e.stopPropagation()}
      >
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
          className="absolute inset-y-0 left-0 bg-[#f91fc3] rounded-full transition-[width] duration-150 ease-linear"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 8px rgba(249,31,195,0.6)",
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>
    </div>
  );
}
