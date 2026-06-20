"use client";

import { useUIStore } from "@/stores/uiStore";
import { useArtist } from "@/queries/useArtist";
import { useArtistTracks } from "@/queries/useArtistTracks";
import { TrackCard } from "@/shared/components/ui/Cards/TrackCard";
import { GlowSkeleton } from "@/shared/components/ui/Skeletons/GlowSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft } from "react-icons/hi2";
import Image from "next/image";
import { useState } from "react";
import { HiCheckBadge } from "react-icons/hi2";

function ArtistSkeleton() {
  return (
    <>
      {/* Header skeleton */}
      <div className="flex flex-col items-center gap-6 mb-8 text-center">
        <GlowSkeleton className="w-40 h-40 rounded-full" />
        <div className="space-y-3 w-full max-w-md">
          <GlowSkeleton className="w-3/4 h-6 rounded-lg mx-auto" />
          <GlowSkeleton className="w-1/2 h-4 rounded-lg mx-auto" />
          <GlowSkeleton className="w-2/3 h-3 rounded-lg mx-auto" />
        </div>
      </div>

      {/* Tracks skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <GlowSkeleton className="w-full aspect-square rounded-xl" />
            <GlowSkeleton className="w-3/4 h-4 rounded-lg" />
            <GlowSkeleton className="w-1/2 h-3 rounded-lg" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function ArtistView() {
  const selectedArtistHandle = useUIStore((s) => s.selectedArtistHandle);
  const selectedArtistId = useUIStore((s) => s.selectedArtistId);
  const setView = useUIStore((s) => s.setView);
  const setSelectedArtist = useUIStore((s) => s.setSelectedArtist);
  const { data: artist, isLoading: artistLoading } = useArtist(selectedArtistHandle);
  const { data: tracks, isLoading: tracksLoading } = useArtistTracks(selectedArtistId);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  if (!selectedArtistHandle) {
    return (
      <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 h-full overflow-y-auto overflow-x-hidden pb-24 md:pb-8">
        <p className="text-white/40">No artist selected</p>
      </div>
    );
  }

  const showSkeleton = artistLoading || tracksLoading;
  const hasTracks = tracks && tracks.length > 0;
  const profilePicUrl = artist?.profile_picture?.["480x480"] || artist?.profile_picture?.["150x150"];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 h-full overflow-y-auto overflow-x-hidden pb-24 md:pb-8">
      {/* Header */}
      <button
        onClick={() => {
          setSelectedArtist(null, null);
          setView("home");
        }}
        className="flex items-center gap-2 text-white/40 hover:text-white/70 transition w-fit"
      >
        <HiChevronLeft size={20} /> Back to Home
      </button>

      {/* Content */}
      <AnimatePresence mode="wait">
        {showSkeleton && (
          <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArtistSkeleton />
          </motion.div>
        )}

        {!showSkeleton && artist && (
          <motion.div
            key={`artist-${selectedArtistHandle}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Artist Header */}
            <div className="flex flex-col items-center gap-6 mb-8 text-center">
              {profilePicUrl && (
                <div className="relative w-40 h-40 rounded-full overflow-hidden ring-2 ring-[#f91fc3]/50">
                  <Image
                    src={imgSrc || profilePicUrl}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={() => setImgSrc("/images/placeholder.jpg")}
                  />
                </div>
              )}
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h1 className="text-4xl font-bold text-white">{artist.name}</h1>
                  {artist.is_verified && (
                    <HiCheckBadge size={28} className="text-[#f91fc3]" />
                  )}
                </div>
                <p className="text-white/60 text-sm mb-2">@{artist.handle}</p>
                {artist.bio && (
                  <p className="text-white/50 text-sm max-w-md">{artist.bio}</p>
                )}
                <p className="text-white/40 text-sm mt-4">
                  {artist.follower_count.toLocaleString()} followers
                </p>
              </div>
            </div>

            {/* Tracks */}
            {hasTracks && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-white/40 text-sm">
                    <span className="text-white/70 font-semibold">{tracks.length}</span> tracks
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {tracks.map((track, i) => (
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
                        artistHandle={track.artistHandle}
                        artistId={track.artistId}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {!hasTracks && !tracksLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <p className="text-white/40 text-lg">No tracks found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
