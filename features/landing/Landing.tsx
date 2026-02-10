import Image from "next/image";
import GlowBackground from "./components/GlowBackground";
import Container from "./sections/Container";
//import Bottom from "./sections/Bottom";

export default function Landing() {
  return (
    <main className="bg-[#230f1e] text-white h-screen w-screen flex items-center justify-center relative overflow-hidden font-display">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-60 blur-[2px] scale-105 overflow-hidden"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/videos/background_Motion_Graphic.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#230f1e]/80 via-transparent to-[#230f1e]/90 z-10" />
      </div>
      <GlowBackground />
      <div className="relative z-10 w-full max-w-3xl py-12">
        <Container />
        {/*<Bottom />*/}
      </div>
    </main>
  );
}
