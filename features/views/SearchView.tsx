"use client";

import SearchBar from "@/shared/components/layout/SearchBar/SearchBar";
import { useUIStore } from "@/stores/uiStore";
import { useSearchTracks } from "@/queries/useSearchTracks";
import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { GlowSkeleton } from "@/shared/components/ui/Skeletons/GlowSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { HiMusicalNote } from "react-icons/hi2";
import { MdOutlineSearchOff } from "react-icons/md";

function ResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <GlowSkeleton className="w-full aspect-square rounded-xl" />
          <GlowSkeleton className="w-3/4 h-4 rounded-lg" />
          <GlowSkeleton className="w-1/2 h-3 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-4"
    >
      <MdOutlineSearchOff className="text-6xl text-white/10" />
      <p className="text-white/40 text-lg">
        No results for{" "}
        <span className="text-white/70 font-semibold">"{query}"</span>
      </p>
      <p className="text-white/25 text-sm">Try a different track or artist name</p>
    </motion.div>
  );
}

function IdleState() {
  const suggestions = [
    "Tame Impala", "Billie Eilish", "Arctic Monkeys",
    "Frank Ocean", "Kendrick Lamar", "Daft Punk",
  ];
  const setSearchQuery = useUIStore((s) => s.setSearchQuery);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 gap-8"
    >
      <div className="flex flex-col items-center gap-3">
        <HiMusicalNote className="text-5xl text-[#f91fc3]/30" />
        <p className="text-white/40 text-base">Start typing to discover music</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-white/25 text-xs tracking-widest uppercase">Try searching for</p>
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setSearchQuery(s)}
              className="px-4 py-1.5 rounded-full border border-[#f91fc3]/20 text-white/50 text-sm hover:border-[#f91fc3]/60 hover:text-white/80 hover:bg-[#f91fc3]/10 transition"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SearchView() {
  const searchQuery = useUIStore((s) => s.searchQuery);
  const { data, isLoading, isFetching } = useSearchTracks(searchQuery);

  const showSkeleton = (isLoading || isFetching) && searchQuery.trim().length > 0;
  const showEmpty = !isLoading && !isFetching && searchQuery.trim().length > 0 && (!data || data.length === 0);
  const showResults = !showSkeleton && data && data.length > 0;
  const showIdle = searchQuery.trim().length === 0;

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="relative pl-5">
          <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
          <h1 className="text-2xl font-bold tracking-wide text-white uppercase">Search</h1>
          <p className="text-sm text-white/40 mt-0.5">Find any track or artist on Audius</p>
        </div>
        <SearchBar autoFocus size="large" />
      </div>

      {/* Results area */}
      <AnimatePresence mode="wait">
        {showIdle && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <IdleState />
          </motion.div>
        )}

        {showSkeleton && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsSkeleton />
          </motion.div>
        )}

        {showEmpty && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmptyState query={searchQuery} />
          </motion.div>
        )}

        {showResults && (
          <motion.div
            key={`results-${searchQuery}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-white/40 text-sm">
                <span className="text-white/70 font-semibold">{data.length}</span> results for{" "}
                <span className="text-[#f91fc3] font-semibold">"{searchQuery}"</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.map((track, i) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.3) }}
                >
                  <TrackCard
                    trackId={track.id}
                    title={track.title}
                    artist={track.artist}
                    image={track.artwork}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
