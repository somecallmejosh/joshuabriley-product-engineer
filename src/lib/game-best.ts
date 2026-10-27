/**
 * Per-visitor best scores for the /play/ games. A convenience only: every
 * storage access is guarded, so private mode or blocked storage just means
 * no "best" line.
 */
export function readBest(key: string): number | null {
  try {
    const value = localStorage.getItem(`game-best-${key}`);
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
}

/** Stores `score` if it beats the saved best; returns the best after saving. */
export function saveBest(key: string, score: number, higherIsBetter = true): number {
  const previous = readBest(key);
  const better = previous === null || (higherIsBetter ? score > previous : score < previous);
  if (better) {
    try {
      localStorage.setItem(`game-best-${key}`, String(score));
    } catch {
      /* storage blocked */
    }
  }
  return better ? score : (previous as number);
}
