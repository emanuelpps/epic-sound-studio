import Image from "next/image";
import ButtonFactory from "../Buttons/ButtonFactory";
export default function Featured() {
  return (
    <div className="w-full flex h-full">
      <div className="w-full flex flex-col relative border-l border-white/10 bg-black/20 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] rounded-2xl justify-end gap-5 p-10">
        <Image
          src="https://res.cloudinary.com/dkgoszhfr/image/upload/f_auto,q_auto/eqazboqimi07hp0fv72h"
          alt=""
          width={100}
          height={150}
          className="absolute bottom-0 right-0 w-full h-full object-cover opacity-60 z-0 rounded-2xl"
        />
        <div className="z-30 flex flex-col gap-5">
          <div>
            <div className="w-full">
              <p className="bg-[#F91FC3] p-1 w-[10%] rounded-lg flex justify-center items-center text-[0.7rem] font-semibold">
                FEATURED
              </p>
            </div>
            <h2 className="text-6xl font-semibold">TITLE TITLE</h2>
          </div>
          <div className="w-[70%] leading-relaxed tracking-wide">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            est et error officia nam doloremque maxime iusto numquam cumque,
            excepturi blanditiis? Expedita temporibus autem doloremque aperiam
            nisi alias laborum doloribus?
          </div>
        </div>
        <div className="w-[50%]">
          <ButtonFactory variant="primary">Listen Now</ButtonFactory>
        </div>
      </div>
    </div>
  );
}
