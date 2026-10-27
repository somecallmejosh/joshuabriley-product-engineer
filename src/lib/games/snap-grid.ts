/**
 * "Snap to grid": nudge interface pieces back onto an 8px spacing grid.
 * Draft copy for Josh's review.
 */

export const GRID = 8;

export interface GridPiece {
  id: string;
  label: string;
  kind: 'button' | 'label' | 'card';
  /** Starting position in px, deliberately off the grid. */
  x: number;
  y: number;
}

export const gridPieces: GridPiece[] = [
  { id: 'heading', label: 'Heading', kind: 'label', x: 27, y: 21 },
  { id: 'card', label: 'Card', kind: 'card', x: 35, y: 69 },
  { id: 'button', label: 'Button', kind: 'button', x: 141, y: 182 },
];

/** Distance in px to the nearest grid line, signed: positive means right/below. */
export function offsetFromGrid(value: number, grid = GRID): number {
  const remainder = ((value % grid) + grid) % grid;
  return remainder <= grid / 2 ? remainder : remainder - grid;
}

export function isSnapped(piece: { x: number; y: number }, grid = GRID): boolean {
  return offsetFromGrid(piece.x, grid) === 0 && offsetFromGrid(piece.y, grid) === 0;
}

/** Plain-language position, used as the piece's spoken status. */
export function describeOffset(piece: { x: number; y: number }, grid = GRID): string {
  if (isSnapped(piece, grid)) return 'on the grid';
  const parts: string[] = [];
  const dx = offsetFromGrid(piece.x, grid);
  const dy = offsetFromGrid(piece.y, grid);
  const px = (n: number) => `${Math.abs(n)} pixel${Math.abs(n) === 1 ? '' : 's'}`;
  if (dx) parts.push(`${px(dx)} too far ${dx > 0 ? 'right' : 'left'}`);
  if (dy) parts.push(`${px(dy)} too ${dy > 0 ? 'low' : 'high'}`);
  return parts.join(', ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
