import Image from "next/image";
import Link from "next/link";

export default function BottomContainer() {
  return (
    <div className="flex flex-col items-center w-full pt-2 mt-5 border-t border-white/5 max-h-5">
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em]">
        Powered by the Future of Web3 Audio
      </p>
      <div className="flex items-center gap-8 transition-opacity  hover:opacity-100 text-white">
        <div className="flex items-center">
          <Link href={"https://audius.co/"} target="_blank">
            <Image
              src="/images/audius-logo.svg"
              alt="Audius Logo"
              width={100}
              height={100}
              className=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
