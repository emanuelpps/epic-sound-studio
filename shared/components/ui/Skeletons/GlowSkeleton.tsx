"use client";

interface Props {
  className?: string;
}

export function GlowSkeleton({ className = "" }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl pointer-events-none ${className} glow-skeleton`}
    >
      <style>{`
        .glow-skeleton {
          background: #1a0f1f;
        }
        .glow-skeleton::before {
          content: '';
          position: absolute;
          inset: 0;
          animation: glowPulse 1.6s ease-in-out infinite;
          box-shadow: inset 0 0 40px rgba(249,31,195,0.2), inset 0 0 80px rgba(249,31,195,0.1);
        }
        .glow-skeleton::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(249,31,195,0.2), transparent);
          animation: glowShimmer 1.4s linear infinite;
          will-change: transform;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.6; }
        }
        @keyframes glowShimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
