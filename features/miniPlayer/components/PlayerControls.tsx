import { FaForward, FaBackward } from "react-icons/fa";

export function PlayerControls() {
  return (
    <div className="flex gap-4 text-white/60">
      <FaBackward className="cursor-pointer hover:text-white" />
      <FaForward className="cursor-pointer hover:text-white" />
    </div>
  );
}
