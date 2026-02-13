import { audiusClient } from "@/lib/audiusClient";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const data = await audiusClient.getTrack(params.id);
  return Response.json(data);
}
