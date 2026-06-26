"use client";

import { useUIStore, View } from "@/stores/uiStore";
import { IconType } from "react-icons";
import {
  RiHome5Line,
  RiSearchLine,
  RiPlayList2Line,
  RiHeart3Line,
} from "react-icons/ri";
import AccountWidget from "../AccountWidget";

type MenuItem = {
  key: View;
  label: string;
  icon: IconType;
};

const menuItems: MenuItem[] = [
  { key: "home", label: "Home", icon: RiHome5Line },
  { key: "search", label: "Search", icon: RiSearchLine },
  { key: "library", label: "Library", icon: RiPlayList2Line },
  { key: "likes", label: "Likes", icon: RiHeart3Line },
];

type MenuProps = {
  /** "sidebar" = vertical desktop rail · "bottom" = horizontal mobile tab bar */
  variant?: "sidebar" | "bottom";
};

export default function Menu({ variant = "sidebar" }: MenuProps) {
  const view = useUIStore((s) => s.view);
  const setView = useUIStore((s) => s.setView);

  /* ── Mobile bottom tab bar ─────────────────────────── */
  if (variant === "bottom") {
    return (
      <div className="flex items-stretch justify-around gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setView(item.key)}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors active:scale-95 ${
                active ? "text-[#f91fc3]" : "text-zinc-400"
              }`}
            >
              {active && (
                <span className="absolute -top-0.5 h-1 w-8 rounded-full bg-[#f91fc3] shadow-[0_0_10px_rgba(249,31,195,0.9)]" />
              )}
              <Icon size={22} className="transition-transform" />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
        <AccountWidget variant="tab" />
      </div>
    );
  }

  /* ── Desktop vertical sidebar ──────────────────────── */
  return (
    <nav className="space-y-2 px-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = view === item.key;

        return (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            aria-current={active ? "page" : undefined}
            className={`cursor-pointer group flex items-center gap-3 w-full px-4 py-3.5 rounded-xl transition-all duration-300 ${
              active
                ? "bg-[#f91fc3]/20 text-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.25)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon
              size={18}
              className={`shrink-0 transition-transform duration-200 ${
                active ? "scale-110" : "group-hover:scale-110"
              }`}
            />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
