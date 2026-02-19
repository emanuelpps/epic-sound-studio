import { usePlayerStore } from "@/stores/playerStore";
import BackIcon from "@/shared/components/ui/Icons/Back";
import NextIcon from "@/shared/components/ui/Icons/Next";

export function PlayerControls() {
  const isPlaylist = usePlayerStore((s) => s.isPlaylist);
  return (
    <div className="flex gap-4 text-white/60">
      {isPlaylist && <BackIcon className="cursor-pointer hover:text-white" />}
      {isPlaylist && <NextIcon className="cursor-pointer hover:text-white" />}
    </div>
  );
}
