export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * How far an element has travelled past a horizontal "reading line"
 * (a fraction of the viewport height): 0 before it arrives, 1 once it has passed.
 */
export function readingProgress({
  top,
  height,
  viewport,
  line = 0.6,
}: {
  top: number;
  height: number;
  viewport: number;
  line?: number;
}): number {
  if (height <= 0) return 1;
  return clamp01((viewport * line - top) / height);
}
