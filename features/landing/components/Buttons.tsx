import { GoArrowRight } from "react-icons/go";
export default function Buttons() {
  return (
    <div className="flex flex-col items-center w-full max-w-lg gap-6 md:flex-row mb-2">
      <a className="w-full group relative flex items-center justify-center gap-3 bg-[#f91fc3] text-white font-bold text-md py-5 px-10 rounded-full btn-glow overflow-hidden">
        <span className="absolute inset-0 transition-transform duration-1000 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
        <span className="relative z-10 tracking-widest uppercase">
          Explore Studio
        </span>
      </a>

      <a className="w-full text-gray-400 hover:text-white font-medium text-md flex items-center justify-center gap-2 border border-white/10 hover:border-[#f91fc3]/50 rounded-full backdrop-blur-sm transition py-5 px-10 rounded-full ">
        Learn More
        <GoArrowRight />
      </a>
    </div>
  );
}
