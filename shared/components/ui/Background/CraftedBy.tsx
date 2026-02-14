import Link from "next/link";
import Image from "next/image";

export default function CraftedBy() {
  return (
    <div className="absolute z-20 bottom-2 right-6">
      <div
        className="flex items-center gap-2 px-3 py-0.5 rounded-full text-[0.6rem]
        text-white/75 backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_18px_rgba(249,31,195,0.08)] hover:shadow-[0_0_22px_rgba(249,31,195,0.18)] transition"
      >
        <span className="uppercase tracking-wider text-white/40">
          Crafted by
        </span>
        <Image
          src="/images/epLogo.png"
          alt="EP logo"
          width={20}
          height={20}
          className="opacity-80 rounded-xl cover p-0.5 contain"
        />
        <Link
          href="https://emanuelp-portfolio.vercel.app/"
          target="_blank"
          className="
            italic
            text-white/80
            hover:text-[#f91fc3]
            hover:drop-shadow-[0_0_6px_rgba(249,31,195,0.45)]
            transition tracking-wide
          "
        >
          Emanuel Pagés
        </Link>
      </div>
    </div>
  );
}
