import Image from "next/image";
import { FiHeart } from "react-icons/fi";

export function HeroCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-fuchsia-900/40 to-black border border-fuchsia-500/20 p-8 h-full w-full  flex flex-col justify-end">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,200,0.25),transparent_60%)]" />
      <Image
        src="https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/eqazboqimi07hp0fv72h"
        alt=""
        width={100}
        height={150}
        className="absolute bottom-0 right-0 w-full h-full object-cover opacity-60 z-0 rounded-2xl"
      />
      <div className="relative z-10 w-full">
        <p className="text-xs font-semibold w-[10%] rounded-lg flex justify-center items-center tracking-wide p-1 bg-[#f91fc3]">
          FEATURED
        </p>

        <h1 className="text-5xl font-bold mb-3">
          <span className="text-white">NEON</span>{" "}
          <span className="text-[#f91fc3]">DRIFT</span>
        </h1>

        <p className="text-white mb-6">
          Experience the latest synthwave masterpiece from CyberJunkie.
        </p>

        <div className="flex gap-4 items-center">
          <button className="px-6 py-2 rounded-full bg-[#f91fc3] hover:bg-[#f91fc3]/30 transition shadow-lg shadow-[#f91fc3]/30">
            ▶ Listen Now
          </button>

          <button className="w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 flex justify-center items-center">
            <FiHeart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
