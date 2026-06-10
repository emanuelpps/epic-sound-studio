"use client";

import { usePlayerStore } from "@/stores/playerStore";
import { useTrack } from "@/queries/useTrack";
import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { GlowSkeleton } from "@/shared/components/ui/Skeletons/GlowSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { HiMusicalNote } from "react-icons/hi2";
import { useEffect, useState } from "react";

function LikesSkeleton() {
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

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-4"
    >
      <HiMusicalNote className="text-6xl text-white/10" />
      <p className="text-white/40 text-lg">No liked tracks yet</p>
      <p className="text-white/25 text-sm">Start liking tracks to add them here</p>
    </motion.div>
  );
}

function TrackLoader({ trackId }: { trackId: string }) {
  const { data: track } = useTrack(trackId);

  if (!track) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.02 }}
    >
      <TrackCard
        trackId={track.id}
        title={track.title}
        artist={track.artist}
        image={track.artwork}
        artistHandle={track.artistHandle}
        artistId={track.artistId}
      />
    </motion.div>
  );
}

export default function LikesView() {
  const likedTracks = usePlayerStore((s) => s.likedTracks);
  const initializeLikes = usePlayerStore((s) => s.initializeLikes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLikes();
    setIsLoading(false);
  }, [initializeLikes]);

  const likedTrackIds = Array.from(likedTracks);
  const hasLikes = likedTrackIds.length > 0;

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="relative pl-5">
          <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
          <h1 className="text-2xl font-bold tracking-wide text-white uppercase">Likes</h1>
          <p className="text-sm text-white/40 mt-0.5">Tracks you love</p>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LikesSkeleton />
          </motion.div>
        )}

        {!isLoading && !hasLikes && (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmptyState />
          </motion.div>
        )}

        {!isLoading && hasLikes && (
          <motion.div
            key="tracks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-white/40 text-sm">
                <span className="text-white/70 font-semibold">{likedTrackIds.length}</span> tracks you love
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {likedTrackIds.map((trackId) => (
                <TrackLoader key={trackId} trackId={trackId} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
