import Image from "next/image";
import GlowBackground from "./components/GlowBackground";
import Container from "./sections/Container";
//import Bottom from "./sections/Bottom";

export default function Landing() {
  return (
    <main className="bg-[#230f1e] text-white max-h-screen flex items-center justify-center relative overflow-hidden font-display">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/soundWaves.png"
          alt="soundwave"
          fill
          className="object-cover scale-100 opacity-60"
          priority
        />

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
