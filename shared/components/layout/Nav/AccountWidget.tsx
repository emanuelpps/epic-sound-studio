"use client";

import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import { RiUser3Line } from "react-icons/ri";

function Avatar({ size }: { size: number }) {
  const profile = useAuthStore((s) => s.profile);
  const user = useAuthStore((s) => s.user);
  const initial = (profile?.display_name || user?.email || "?").slice(0, 1).toUpperCase();

  return (
    <span
      className="relative rounded-full overflow-hidden bg-[#2a0f2d] flex items-center justify-center shrink-0 ring-1 ring-[#f91fc3]/30"
      style={{ width: size, height: size }}
    >
      {profile?.avatar_url ? (
        <Image src={profile.avatar_url} alt="" fill sizes={`${size}px`} className="object-cover" unoptimized />
      ) : user ? (
        <span className="font-bold text-white/80" style={{ fontSize: size * 0.42 }}>{initial}</span>
      ) : (
        <RiUser3Line className="text-white/60" size={size * 0.5} />
      )}
    </span>
  );
}

/**
 * Account entry point. `sidebar` = full row pinned to the desktop nav footer.
 * `tab` = compact item for the mobile bottom bar.
 */
export default function AccountWidget({ variant }: { variant: "sidebar" | "tab" }) {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const view = useUIStore((s) => s.view);
  const setView = useUIStore((s) => s.setView);
  const active = view === "profile";

  const label = user ? profile?.display_name || "You" : "Sign in";

  if (variant === "tab") {
    return (
      <button
        onClick={() => setView("profile")}
        aria-label={user ? "Profile" : "Sign in"}
        aria-current={active ? "page" : undefined}
        className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors active:scale-95 ${
          active ? "text-[#f91fc3]" : "text-zinc-400"
        }`}
      >
        {active && <span className="absolute -top-0.5 h-1 w-8 rounded-full bg-[#f91fc3] shadow-[0_0_10px_rgba(249,31,195,0.9)]" />}
        <Avatar size={22} />
        <span className="text-[10px] font-medium tracking-wide truncate max-w-[64px]">{user ? "You" : "Sign in"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setView("profile")}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all ${
        active ? "bg-[#f91fc3]/15 ring-1 ring-[#f91fc3]/25" : "hover:bg-white/5"
      }`}
    >
      <Avatar size={36} />
      <span className="flex flex-col min-w-0 text-left">
        <span className={`text-sm font-semibold truncate ${active ? "text-[#f91fc3]" : "text-white/90"}`}>{label}</span>
        <span className="text-[11px] text-white/40 truncate">{user ? "View profile" : "Save your library"}</span>
      </span>
    </button>
  );
}
