import ButtonFactory from "@/shared/components/ui/Buttons/ButtonFactory";

export default function BottomSection() {
  return (
    <div className="w-[100%] glass-panel rounded-b-3xl bg-black/30 flex justify-center items-center flex-col pb-10 pt-10">
      <div className="w-[30%] flex justify-center items-center">
        <ButtonFactory variant="primary" link="/player">
          <span className="uppercase">Listen Now</span>
        </ButtonFactory>
      </div>
    </div>
  );
}
