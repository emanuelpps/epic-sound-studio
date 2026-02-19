interface Props {
  progress: number;
}

export function PlayerProgressRing({ progress }: Props) {
  const size = 96;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg width={size} height={size} className="absolute rotate-[-90deg]">
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
        strokeDashoffset={circumference * (1 - progress)}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        className="drop-shadow-[0_0_8px_#f91fc3]"
      />
    </svg>
  );
}
