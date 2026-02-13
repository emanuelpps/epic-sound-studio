import { audiusClient } from "@/lib/audiusClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return Response.json({ error: "handle required" }, { status: 400 });
  }

  const data = await audiusClient.getUser(handle);
  return Response.json(data);
}
