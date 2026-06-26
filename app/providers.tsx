"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  // Resolve the Supabase session once, set up auth listeners, and sync the
  // user's library. No-op (loading=false) when Supabase env vars are absent.
  useEffect(() => {
    useAuthStore.getState().init();
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}
