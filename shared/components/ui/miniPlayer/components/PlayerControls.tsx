import { usePlayerStore } from "@/stores/playerStore";
import BackIcon from "@/shared/components/ui/Icons/Back";
import NextIcon from "@/shared/components/ui/Icons/Next";
import { handleNext } from "@/lib/functions/handleNext";
import { handlePrev } from "@/lib/functions/handlePrev";

export function PlayerControls() {
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);
  return (
    <div className="flex gap-4 text-white/60">
      {isPlaylist && (
        <button onClick={handlePrev} className="cursor-pointer hover:text-white transition">
          <BackIcon />
        </button>
      )}
      {isPlaylist && (
        <button onClick={handleNext} className="cursor-pointer hover:text-white transition">
          <NextIcon />
        </button>
      )}
    </div>
  );
}
