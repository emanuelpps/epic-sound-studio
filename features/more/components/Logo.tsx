import LogoContainer from "@/shared/components/ui/LogoContainer/LogoContainer";

export default function Logo() {
  return (
    <LogoContainer
      width={200}
      height={200}
      className=" bg-black/50 rounded-full border border-[#f91fc3]/40 px-8 py-4"
      src="/images/epic-sound-studio-logo.svg"
    />
  );
}
