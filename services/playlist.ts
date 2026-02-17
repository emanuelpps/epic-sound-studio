export async function getAudiusHost(): Promise<string> {
  const res = await fetch("https://api.audius.co", {
    next: { revalidate: 60 * 60 },
  });

  const json = await res.json();
  return json.data[0];
}
