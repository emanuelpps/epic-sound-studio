import { audiusClient } from "@/lib/audiusClient"


export async function GET() {
  const data = await audiusClient.getTrending(20)
  return Response.json(data)
}
