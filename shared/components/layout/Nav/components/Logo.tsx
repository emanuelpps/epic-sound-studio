import LogoContainer from "@/shared/components/ui/LogoContainer/LogoContainer";

export default function Logo() {
  return (
    <LogoContainer
      width={50}
      height={50}
      className="bg-black/50 border border-[#f91fc3]/40 px-3 py-2 m-3 border rounded-2xl"
      src="/images/epic-sound-player-logo.svg"
    />
  );
}
