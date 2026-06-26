export default function GlowBackground() {
  return (
    <>
      <div
        className="absolute top-[-25%] left-[-15%] w-[500px] h-[400px] bg-[#f91fc3] rounded-full pointer-events-none"
        style={{
          filter: "blur(180px)",
          opacity: 0.18,
          willChange: "opacity",
          animation: "glowFloat 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[300px] bg-[#f91fc3] rounded-full pointer-events-none"
        style={{
          filter: "blur(200px)",
          opacity: 0.12,
          willChange: "opacity",
          animation: "glowFloat 10s ease-in-out infinite reverse",
        }}
      />
      <style>{`
        @keyframes glowFloat {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
      `}</style>
    </>
  );
}
