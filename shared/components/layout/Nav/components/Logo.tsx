import LogoContainer from "@/shared/components/ui/LogoContainer/LogoContainer";

export default function Logo() {
  return (
    <LogoContainer
      width={50}
      height={50}
      className="border border-[#f91fc3]/40 px-6 py-1 m-2 border rounded-2xl"
      src="/images/epic-sound-player-logo.svg"
    />
  );
}
