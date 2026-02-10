export default function GlowBackground() {
  return (
    <>
      <div className="absolute top-[-25%] left-[-15%] w-[700px] h-[700px] bg-[#f91fc3] rounded-full blur-[180px] opacity-20 pointer-events-none animate-pulse" />

      <div className="absolute bottom-[-15%] right-[-10%] w-[800px] h-[800px] bg-[#f91fc3] rounded-full blur-[200px] opacity-15 pointer-events-none" />
    </>
  );
}
