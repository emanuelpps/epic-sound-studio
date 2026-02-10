export default function Bottom() {
  return (
    <footer className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest px-4">

      <div>© 2024 EPIC SOUND STUDIO. ALL RIGHTS RESERVED.</div>

      <div className="flex gap-8">
        <a className="hover:text-[#f91fc3] border-b border-transparent hover:border-[#f91fc3]/30">
          Terms of Service
        </a>
        <a className="hover:text-[#f91fc3] border-b border-transparent hover:border-[#f91fc3]/30">
          Privacy Protocol
        </a>
      </div>

    </footer>
  );
}
