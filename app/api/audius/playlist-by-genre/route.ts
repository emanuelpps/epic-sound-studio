import { audiusClient } from "@/lib/audiusClient"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const genre = searchParams.get("genre") || "Electronic"

  const data = await audiusClient.searchPlaylistsByGenre(genre, 30)

  return Response.json(data)
}
