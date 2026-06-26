import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { usePlayerStore } from "./playerStore";
import { loadLikes, saveLikes } from "@/lib/localStorage";
import { fetchDbLikeIds, mergeLocalLikes } from "@/services/likes/likesSync";

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

export type OAuthProvider = "google";

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean; // initial session resolution
  syncing: boolean; // library merge in progress
  initialized: boolean;

  init: () => void;
  signInWithProvider: (p: OAuthProvider) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (
    patch: Partial<Pick<Profile, "username" | "display_name" | "avatar_url">>
  ) => Promise<{ error?: string }>;
}

async function loadProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url")
    .eq("id", userId)
    .single();
  return (data as Profile) ?? null;
}

/** Merge anonymous likes into DB, then load the union into the player store. */
async function syncLibraryOnLogin(userId: string) {
  const localIds = Array.from(loadLikes());
  await mergeLocalLikes(userId, localIds);
  const dbIds = await fetchDbLikeIds(userId);
  const union = new Set<string>([...localIds, ...dbIds]);
  usePlayerStore.getState().setLikedTracks(union);
  saveLikes(union); // keep localStorage warm as an offline cache
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,
  syncing: false,
  initialized: false,

  init: () => {
    if (!supabase || get().initialized) {
      set({ loading: false });
      return;
    }
    set({ initialized: true });

    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user ?? null;
      set({ user, loading: false });
      usePlayerStore.getState().setCurrentUserId(user?.id ?? null);
      if (user) {
        set({ syncing: true });
        set({ profile: await loadProfile(user.id) });
        await syncLibraryOnLogin(user.id);
        set({ syncing: false });
      }
    });

    supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user ?? null;
      const prevId = get().user?.id ?? null;
      set({ user });
      usePlayerStore.getState().setCurrentUserId(user?.id ?? null);

      if (event === "SIGNED_IN" && user && user.id !== prevId) {
        set({ syncing: true });
        set({ profile: await loadProfile(user.id) });
        await syncLibraryOnLogin(user.id);
        set({ syncing: false });
      }
      if (event === "SIGNED_OUT") {
        set({ profile: null });
        usePlayerStore.getState().setLikedTracks(loadLikes());
      }
    });
  },

  signInWithProvider: async (provider) => {
    if (!supabase) return;
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/player` : undefined,
      },
    });
  },

  signUpWithEmail: async (email, password) => {
    if (!supabase) return { error: "Auth not configured" };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== "undefined" ? `${window.location.origin}/player` : undefined,
      },
    });
    if (error) return { error: error.message };
    // No session means the project requires email confirmation first.
    return { needsConfirmation: !data.session };
  },

  signInWithEmail: async (email, password) => {
    if (!supabase) return { error: "Auth not configured" };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  },

  signOut: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  },

  refreshProfile: async () => {
    const u = get().user;
    if (!u) return;
    set({ profile: await loadProfile(u.id) });
  },

  updateProfile: async (patch) => {
    const u = get().user;
    if (!supabase || !u) return { error: "Not signed in" };
    const { error } = await supabase.from("profiles").update(patch).eq("id", u.id);
    if (error) return { error: error.message };
    await get().refreshProfile();
    return {};
  },
}));
