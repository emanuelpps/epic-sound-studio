import handleSeek from "@/lib/functions/handleSeek";
import { usePlayerStore } from "@/stores/playerStore";

export function PlayerProgressRing() {
  const { progress, duration } = usePlayerStore();

  const normalizedProgress = progress / 100;

  const size = 96;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;



  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={(e) => handleSeek(e, duration)} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        title="Adelantar / Atrasar"
      />

      <svg
        width={size}
        height={size}
        className="absolute rotate-[-90deg] pointer-events-none"
      >
        <circle
          stroke="rgba(255,255,255,0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="#f91fc3"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - normalizedProgress)}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-[stroke-dashoffset] duration-200 ease-linear drop-shadow-[0_0_8px_#f91fc3]"
        />
      </svg>
    </div>
  );
}
