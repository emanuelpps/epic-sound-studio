import Link from "next/link";

export default function CraftedBy() {
  return (
    <div className="absolute z-20 bottom-2 right-6">
      <div className="glass-panel px-3 py-1.5 rounded-3xl text-xs text-white/80 flex gap-2">
        <span>Crafted by</span>
        <Link
          href="https://emanuelp-portfolio.vercel.app/"
          target="_blank"
          className="italic hover:text-[#f91fc3] transition"
        >
          Emanuel Pagés
        </Link>
      </div>
    </div>
  );
}
