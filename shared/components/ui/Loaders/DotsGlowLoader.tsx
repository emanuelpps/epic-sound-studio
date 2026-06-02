export function DotsGlowLoader() {
  return (
    <div className="flex items-center justify-center h-full gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-[#F91FC3]"
          style={{
            boxShadow: "0 0 8px rgba(249,31,195,0.9), 0 0 18px rgba(249,31,195,0.5)",
            animation: "dotsGlowBounce 0.9s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
      <style>{`
        @keyframes dotsGlowBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
