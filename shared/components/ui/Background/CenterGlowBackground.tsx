export default function CenterGlowBackground() {
  return (
    <>
      {/* Glow superior */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute 
            top-[-15%] 
            left-1/2 
            -translate-x-1/2
            w-[420px] 
            h-[320px] 
            rounded-full
            bg-[radial-gradient(ellipse_at_center,_rgba(255,60,210,0.35),_rgba(140,60,255,0.25),_transparent_70%)]
            blur-[140px]
          "
        />
      </div>

      {/* Glow inferior */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
          
            absolute 
            bottom-[-20%] 
            left-1/2 
            -translate-x-1/2
            w-[480px] 
            h-[340px] 
            rounded-full
            bg-[radial-gradient(ellipse_at_center,_#f91fc3,_transparent_75%)]
            blur-[170px]
          "
        />
      </div>
    </>
  );
}
