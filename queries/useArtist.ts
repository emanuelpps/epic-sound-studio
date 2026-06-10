import { useQuery } from "@tanstack/react-query";
import { getArtist } from "@/services/artist/getArtist";

export function useArtist(handle: string | null) {
  return useQuery({
    queryKey: ["artist", handle],
    queryFn: () => getArtist(handle ?? ""),
    staleTime: 1000 * 60 * 30,
    enabled: !!handle && handle.trim().length > 0,
  });
}
