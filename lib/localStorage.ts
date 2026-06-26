const LIKES_KEY = "epic-sound-studio-likes";

export function saveLikes(likedTracks: Set<string>): void {
  try {
    const json = JSON.stringify(Array.from(likedTracks));
    localStorage.setItem(LIKES_KEY, json);
  } catch (e) {
    console.error("Failed to save likes:", e);
  }
}

export function loadLikes(): Set<string> {
  try {
    const json = localStorage.getItem(LIKES_KEY);
    if (!json) return new Set();
    return new Set(JSON.parse(json));
  } catch (e) {
    console.error("Failed to load likes:", e);
    return new Set();
  }
}
