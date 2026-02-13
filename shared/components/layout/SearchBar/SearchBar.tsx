export default function SearchBar() {
  return (
    <section className="w-full">
      <div
        className="w-[60%] backdrop-blur-xl bg-[#230F1E]/70 border border-[#f91fc333]
        rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] px-6 py-1"
      >
        <input
          type="text"
          placeholder="Search tracks, artists, vibes..."
          className="w-full bg-transparent outline-none text-white placeholder:text-white/40 text-md tracking-wide"
        />
      </div>
    </section>
  );
}
