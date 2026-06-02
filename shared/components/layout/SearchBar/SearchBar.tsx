"use client";

import { useUIStore } from "@/stores/uiStore";
import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

interface SearchBarProps {
  autoFocus?: boolean;
  size?: "default" | "large";
}

export default function SearchBar({ autoFocus, size = "default" }: SearchBarProps) {
  const setView = useUIStore((s) => s.setView);
  const searchQuery = useUIStore((s) => s.searchQuery);
  const setSearchQuery = useUIStore((s) => s.setSearchQuery);

  const [localValue, setLocalValue] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Keep local value in sync when query is cleared externally
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim()) {
      setView("search");
      debounceRef.current = setTimeout(() => {
        setSearchQuery(val);
      }, 350);
    } else {
      setSearchQuery("");
    }
  };

  const handleClear = () => {
    setLocalValue("");
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") handleClear();
  };

  const isLarge = size === "large";

  return (
    <section className={isLarge ? "w-full" : "w-full"}>
      <div
        className={`
          relative flex items-center gap-3
          backdrop-blur-xl bg-[#230F1E]/70 border border-[#f91fc333]
          rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]
          transition-[border-color,box-shadow] duration-200
          focus-within:border-[#f91fc3]/60 focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(249,31,195,0.15)]
          ${isLarge ? "px-6 py-4 w-full" : "px-6 py-1 w-[60%]"}
        `}
      >
        <HiMagnifyingGlass
          className={`shrink-0 text-white/30 transition-colors focus-within:text-[#f91fc3] ${isLarge ? "text-xl" : "text-base"}`}
        />
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search tracks, artists, vibes..."
          className={`flex-1 bg-transparent outline-none text-white placeholder:text-white/40 tracking-wide ${isLarge ? "text-lg" : "text-md"}`}
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="text-white/30 hover:text-white/70 transition shrink-0"
          >
            <HiXMark className="text-lg" />
          </button>
        )}
      </div>
    </section>
  );
}
