"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { usePlayerStore } from "@/stores/playerStore";
import { useUIStore } from "@/stores/uiStore";
import { supabase, isSupabaseEnabled } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineHeart,
  HiArrowRightOnRectangle,
  HiCheck,
  HiPencil,
  HiOutlineCloudArrowUp,
  HiSparkles,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
} from "react-icons/hi2";

/* ── Signed-out: value prop + Google + email/password ──── */
function SignedOut() {
  const signInWithProvider = useAuthStore((s) => s.signInWithProvider);
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);
  const signInWithEmail = useAuthStore((s) => s.signInWithEmail);
  const likedCount = usePlayerStore((s) => s.likedTracks.size);

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<null | "google" | "email">(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const google = async () => {
    setBusy("google");
    try { await signInWithProvider("google"); } finally { /* redirects away */ }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!email.trim() || !password) { setError("Enter your email and password"); return; }
    if (mode === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setBusy("email");
    const res =
      mode === "signup"
        ? await signUpWithEmail(email.trim(), password)
        : await signInWithEmail(email.trim(), password);
    setBusy(null);
    if (res.error) { setError(res.error); return; }
    if (mode === "signup" && "needsConfirmation" in res && res.needsConfirmation) {
      setInfo("Account created — check your email to confirm, then sign in.");
      setMode("signin");
      setPassword("");
    }
    // otherwise onAuthStateChange flips the view to the signed-in profile
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md flex flex-col items-center text-center gap-6 py-8"
    >
      <div className="h-16 w-16 rounded-2xl bg-[#f91fc3]/10 border border-[#f91fc3]/30 flex items-center justify-center shadow-[0_0_30px_rgba(249,31,195,0.35)]">
        <HiSparkles className="text-3xl text-[#f91fc3]" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white">Keep your library forever</h2>
        <p className="text-sm text-white/45 mt-2 leading-relaxed">
          You can listen and like tracks without an account — they live on this device.
          Sign in to sync your library everywhere and never lose it.
        </p>
      </div>

      {!isSupabaseEnabled ? (
        <p className="text-sm text-amber-300/70 bg-amber-300/10 border border-amber-300/20 rounded-xl px-4 py-3">
          Auth isn&apos;t configured yet. Add your Supabase env vars to enable sign-in.
        </p>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {/* Google */}
          <button
            onClick={google}
            disabled={!!busy}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white text-[#1a1a1a] font-semibold hover:bg-white/90 transition disabled:opacity-60 active:scale-[0.98]"
          >
            {busy === "google" ? <Spinner dark /> : <FcGoogle size={22} />}
            Continue with Google
          </button>

          {/* divider */}
          <div className="flex items-center gap-3 text-white/25 text-xs">
            <span className="h-px flex-1 bg-white/10" /> OR <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Email + password */}
          <form onSubmit={submit} className="flex flex-col gap-3 text-left">
            <label className="relative block">
              <HiOutlineEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-[#f91fc3]/50 transition"
              />
            </label>
            <label className="relative block">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                placeholder={mode === "signup" ? "Create a password (min. 6)" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-[#f91fc3]/50 transition"
              />
            </label>

            <button
              type="submit"
              disabled={!!busy}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#f91fc3] text-white font-semibold hover:bg-[#ff3fd0] transition disabled:opacity-60 active:scale-[0.98]"
              style={{ boxShadow: "0 0 24px rgba(249,31,195,0.4)" }}
            >
              {busy === "email" && <Spinner />}
              {mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          {error && (
            <p className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-left">
              {error}
            </p>
          )}
          {info && (
            <p className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-left">
              {info}
            </p>
          )}

          {/* mode toggle */}
          <button
            onClick={() => {
              setMode((m) => (m === "signin" ? "signup" : "signin"));
              setError(null);
              setInfo(null);
            }}
            className="text-sm text-white/40 hover:text-[#f91fc3] transition"
          >
            {mode === "signin"
              ? "Don't have an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </div>
      )}

      <p className="text-xs text-white/30">
        {likedCount > 0
          ? `${likedCount} liked track${likedCount === 1 ? "" : "s"} on this device will be merged into your account.`
          : "Your local likes will be merged into your account on sign-in."}
      </p>
    </motion.div>
  );
}

/* ── Signed-in: profile + avatar + stats ───────────────── */
function SignedIn() {
  const user = useAuthStore((s) => s.user)!;
  const profile = useAuthStore((s) => s.profile);
  const syncing = useAuthStore((s) => s.syncing);
  const signOut = useAuthStore((s) => s.signOut);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);
  const likedCount = usePlayerStore((s) => s.likedTracks.size);

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile?.display_name ?? "");
  const [savingName, setSavingName] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setName(profile?.display_name ?? ""); }, [profile?.display_name]);

  const initials = (profile?.display_name || user.email || "?").slice(0, 1).toUpperCase();

  const onPickAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;
    if (file.size > 5 * 1024 * 1024) { setError("Image must be under 5 MB"); return; }
    setError(null);
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${user.id}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      // cache-bust so the new image shows immediately
      const url = `${data.publicUrl}?v=${Date.now()}`;
      const res = await updateProfile({ avatar_url: url });
      if (res.error) throw new Error(res.error);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const saveName = async () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === profile?.display_name) { setEditing(false); return; }
    setSavingName(true);
    const res = await updateProfile({ display_name: trimmed });
    setSavingName(false);
    if (res.error) setError(res.error);
    else { setEditing(false); refreshProfile(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-2xl flex flex-col gap-6"
    >
      {/* Hero card */}
      <div className="relative rounded-3xl overflow-hidden bg-[#120914]/60 border border-white/[0.06] p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,31,195,0.18),transparent_55%)]" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-[#f91fc3]/40 bg-[#2a0f2d] flex items-center justify-center"
              style={{ boxShadow: "0 0 40px rgba(249,31,195,0.3)" }}
            >
              {profile?.avatar_url ? (
                <Image src={profile.avatar_url} alt="Avatar" fill sizes="112px" className="object-cover" unoptimized />
              ) : (
                <span className="text-4xl font-black text-white/80">{initials}</span>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Spinner />
                </div>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label="Change avatar"
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#f91fc3] flex items-center justify-center border-2 border-[#120914] hover:scale-105 active:scale-95 transition disabled:opacity-60"
              style={{ boxShadow: "0 0 16px rgba(249,31,195,0.6)" }}
            >
              <HiOutlineCloudArrowUp className="text-white" size={18} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickAvatar} />
          </div>

          {/* Name + email */}
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <input
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveName()}
                  maxLength={40}
                  className="bg-white/5 border border-[#f91fc3]/30 rounded-lg px-3 py-1.5 text-xl font-bold text-white outline-none focus:border-[#f91fc3]/60 w-full max-w-xs"
                />
                <button onClick={saveName} disabled={savingName} className="shrink-0 w-9 h-9 rounded-lg bg-[#f91fc3]/20 text-[#f91fc3] flex items-center justify-center hover:bg-[#f91fc3]/30 transition">
                  {savingName ? <Spinner /> : <HiCheck size={18} />}
                </button>
              </div>
            ) : (
              <button onClick={() => setEditing(true)} className="group flex items-center gap-2 justify-center sm:justify-start w-full">
                <h1 className="text-2xl font-bold text-white truncate">{profile?.display_name || "Listener"}</h1>
                <HiPencil className="text-white/30 group-hover:text-[#f91fc3] transition shrink-0" size={16} />
              </button>
            )}
            <p className="text-sm text-white/40 mt-1 truncate">{user.email}</p>
          </div>
        </div>

        {error && <p className="relative z-10 mt-4 text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#120914]/60 border border-white/[0.06] p-5">
          <div className="flex items-center gap-2 text-[#f91fc3]">
            <HiOutlineHeart size={18} />
            <span className="text-2xl font-bold text-white tabular-nums">{likedCount}</span>
          </div>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Liked tracks {syncing && "· syncing…"}</p>
        </div>
        <div className="rounded-2xl bg-[#120914]/60 border border-white/[0.06] p-5">
          <p className="text-2xl font-bold text-white">∞</p>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Synced everywhere</p>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:border-red-500/40 hover:bg-red-500/5 transition"
      >
        <HiArrowRightOnRectangle size={18} /> Sign out
      </button>
    </motion.div>
  );
}

function Spinner({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`w-4 h-4 rounded-full animate-spin border-2 ${
        dark ? "border-[#1a1a1a] border-t-transparent" : "border-white border-t-transparent"
      }`}
    />
  );
}

/* ── view shell ────────────────────────────────────────── */
export default function ProfileView() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setView = useUIStore((s) => s.setView);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 h-full overflow-y-auto overflow-x-hidden pb-24 md:pb-8">
      {/* Header */}
      <div className="relative pl-5">
        <span className="absolute left-0 top-1 bottom-1 w-[5px] rounded-full bg-[#f91fc3] shadow-[0_0_12px_rgba(249,31,195,0.9),0_0_24px_rgba(249,31,195,0.4)]" />
        <h1 className="text-2xl font-bold tracking-wide text-white uppercase">{user ? "Profile" : "Account"}</h1>
        <p className="text-sm text-white/40 mt-0.5">{user ? "Your library, synced" : "Sign in to sync your library"}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24"><Spinner /></div>
      ) : user ? (
        <SignedIn />
      ) : (
        <SignedOut />
      )}

      {/* subtle back affordance for mobile flows */}
      <button onClick={() => setView("home")} className="mx-auto text-xs text-white/25 hover:text-white/50 transition">
        ← Back to music
      </button>
    </div>
  );
}
