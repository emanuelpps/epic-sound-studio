import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

export default function PlayerControls() {
  return (
    <div className="flex items-center justify-center gap-10 mt-6">

      <FaStepBackward className="text-2xl text-gray-400 hover:text-white cursor-pointer transition" />

      <button className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl shadow-[0_0_40px_rgba(255,0,255,0.5)] hover:scale-105 transition">
        <FaPlay />
      </button>

      <FaStepForward className="text-2xl text-gray-400 hover:text-white cursor-pointer transition" />
    </div>
  );
}
