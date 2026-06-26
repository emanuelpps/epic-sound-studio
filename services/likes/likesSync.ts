import { supabase } from "@/lib/supabase/client";

/**
 * Persistence helpers for a user's liked tracks. Library/Likes views re-fetch
 * full track data by id, so storing the track_id is enough; title/artist/
 * artwork are optional denormalized hints.
 */

export type LikeMeta = { title?: string; artist?: string; artwork?: string };

export async function fetchDbLikeIds(userId: string): Promise<string[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("liked_tracks")
    .select("track_id")
    .eq("user_id", userId);
  if (error) {
    console.error("[likes] fetch:", error.message);
    return [];
  }
  return (data ?? []).map((r) => r.track_id as string);
}

export async function addDbLike(userId: string, trackId: string, meta?: LikeMeta) {
  if (!supabase) return;
  const { error } = await supabase.from("liked_tracks").upsert(
    {
      user_id: userId,
      track_id: trackId,
      title: meta?.title ?? null,
      artist: meta?.artist ?? null,
      artwork: meta?.artwork ?? null,
    },
    { onConflict: "user_id,track_id" }
  );
  if (error) console.error("[likes] add:", error.message);
}

export async function removeDbLike(userId: string, trackId: string) {
  if (!supabase) return;
  const { error } = await supabase
    .from("liked_tracks")
    .delete()
    .eq("user_id", userId)
    .eq("track_id", trackId);
  if (error) console.error("[likes] remove:", error.message);
}

/** Bulk-insert anonymous (localStorage) likes into the DB, ignoring dupes. */
export async function mergeLocalLikes(userId: string, localIds: string[]) {
  if (!supabase || localIds.length === 0) return;
  const rows = localIds.map((id) => ({ user_id: userId, track_id: id }));
  const { error } = await supabase
    .from("liked_tracks")
    .upsert(rows, { onConflict: "user_id,track_id", ignoreDuplicates: true });
  if (error) console.error("[likes] merge:", error.message);
}
