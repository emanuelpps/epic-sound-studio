let cachedHost: string | null = null
let lastFetch = 0

export async function getAudiusHost() {
  const now = Date.now()

  if (cachedHost && now - lastFetch < 15 * 60 * 1000) {
    return cachedHost
  }

  const res = await fetch("https://api.audius.co")
  const json = await res.json()

  cachedHost = json.data[0]
  lastFetch = now

  return cachedHost
}
