import BackIcon from "@/shared/components/ui/Icons/Back";
import NextIcon from "@/shared/components/ui/Icons/Next";
import PlayIcon from "@/shared/components/ui/Icons/Play";

export default function PlayerControls() {
  return (
    <div className="flex items-center justify-center gap-10">
      <BackIcon className="text-2xl text-gray-400 transition cursor-pointer hover:text-white" />

      <button className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl shadow-[0_0_40px_rgba(255,0,255,0.5)] hover:scale-105 transition">
        <PlayIcon />
      </button>

      <NextIcon className="text-2xl text-gray-400 transition cursor-pointer hover:text-white" />
    </div>
  );
}
