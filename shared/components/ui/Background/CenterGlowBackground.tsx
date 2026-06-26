export default function CenterGlowBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[400px] h-[280px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,60,210,0.3) 0%, rgba(140,60,255,0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[440px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(249,31,195,0.22) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
