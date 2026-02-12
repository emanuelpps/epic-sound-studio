"use client";

import { useUIStore, View } from "@/stores/uiStore";
import { IconType } from "react-icons";
import {
  RiHome5Line,
  RiSearchLine,
  RiPlayList2Line,
  RiHeart3Line,
} from "react-icons/ri";

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

export default function Menu() {
  const view = useUIStore((s) => s.view);
  const setView = useUIStore((s) => s.setView);

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = view === item.key;

        return (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className={`
              group flex items-center gap-3 w-full ml-2 px-6 py-4 rounded-xl
              transition-all duration-300
              ${
                active
                  ? "bg-[#f91fc3]/20 text-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.25)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <Icon
              size={18}
              className={`transition-transform duration-200 ${
                active ? "scale-110" : "group-hover:scale-110"
              }`}
            />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
