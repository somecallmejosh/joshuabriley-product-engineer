/**
 * Shared module: ROI / UI-debt calculator inputs, formulas, and URL encoding.
 * Pure and framework-free — imported by the /tools/roi-calculator/ island and page.
 *
 * Philosophy: every output traces to an input, multipliers are conservative and
 * visible. We would rather show a defensible number than an inflated one.
 */

export interface RoiInputs {
  /** People who regularly build or touch UI (designers + front-end engineers). */
  team: number;
  /** Distinct products / surfaces / apps the team maintains. */
  surfaces: number;
  /** Blended fully-loaded hourly cost, in dollars. */
  rate: number;
  /** Hours per person per week currently lost to UI rework, drift, and reconciliation. */
  reworkHours: number;
  /** How inconsistent the current UI is. Drives how much of that rework is recoverable. */
  inconsistency: InconsistencyLevel;
}

export type InconsistencyLevel = 'low' | 'medium' | 'high';

interface RoiResult {
  /** Recoverable engineer/designer hours per year across the whole team. */
  hoursSavedPerYear: number;
  /** Dollar value of those recovered hours per year. */
  debtCostPerYear: number;
  /** Share of UI-rework time a structured system is modelled to reclaim (0–1). */
  velocityReclaimPct: number;
  /** Annual cost of UI rework as it stands today. */
  withoutSystem: number;
  /** Annual cost of UI rework once a structured system absorbs the recoverable share. */
  withSystem: number;
}

// ─── Tunables ────────────────────────────────────────────────────────────────
// Conservative, documented assumptions. Surfaced verbatim on the page.

/** Working weeks per year (52 minus ~6 for holiday/PTO/ramp). */
export const WEEKS_PER_YEAR = 46;

/**
 * Fraction of current UI-rework time a structured system is modelled to reclaim,
 * by how inconsistent things are today. More drift today → more to recover.
 * Deliberately well under 100%: a system removes avoidable rework, not all of it.
 */
export const RECLAIM_BY_LEVEL: Record<InconsistencyLevel, number> = {
  low: 0.2,
  medium: 0.4,
  high: 0.6,
};

/**
 * Per-surface drag: each additional product/surface multiplies reconciliation
 * cost slightly (keeping N systems in sync). Capped so it never runs away.
 */
export const SURFACE_DRAG = 0.05;
export const SURFACE_DRAG_CAP = 0.5;

export const RECOVERY_CAP = 0.85;

export const INCONSISTENCY_LEVELS: { id: InconsistencyLevel; label: string; hint: string }[] = [
  { id: 'low', label: 'Mostly consistent', hint: 'Occasional drift, shared components exist' },
  { id: 'medium', label: 'Noticeably drifting', hint: 'Duplicates and one-offs are common' },
  { id: 'high', label: 'Inconsistent', hint: 'Every team rebuilds; little is shared' },
];

export const DEFAULTS: RoiInputs = {
  team: 8,
  surfaces: 3,
  rate: 95,
  reworkHours: 4,
  inconsistency: 'medium',
};

export const BOUNDS = {
  team: { min: 1, max: 100 },
  surfaces: { min: 1, max: 25 },
  rate: { min: 20, max: 400 },
  reworkHours: { min: 0, max: 20 },
} as const;

// ─── Core formula ────────────────────────────────────────────────────────────

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

/** Normalise raw (possibly user-typed) inputs into safe bounds. */
function normalize(inputs: RoiInputs): RoiInputs {
  return {
    team: Math.round(clamp(inputs.team, BOUNDS.team.min, BOUNDS.team.max)),
    surfaces: Math.round(clamp(inputs.surfaces, BOUNDS.surfaces.min, BOUNDS.surfaces.max)),
    rate: Math.round(clamp(inputs.rate, BOUNDS.rate.min, BOUNDS.rate.max)),
    reworkHours: clamp(inputs.reworkHours, BOUNDS.reworkHours.min, BOUNDS.reworkHours.max),
    inconsistency: RECLAIM_BY_LEVEL[inputs.inconsistency] ? inputs.inconsistency : 'medium',
  };
}

export function computeRoi(raw: RoiInputs): RoiResult {
  const inputs = normalize(raw);

  const surfaceDrag = Math.min(SURFACE_DRAG_CAP, (inputs.surfaces - 1) * SURFACE_DRAG);
  const reclaim = RECLAIM_BY_LEVEL[inputs.inconsistency] * (1 + surfaceDrag);
  const velocityReclaimPct = Math.min(RECOVERY_CAP, reclaim);

  const annualReworkHours = inputs.reworkHours * inputs.team * WEEKS_PER_YEAR;
  const withoutSystem = annualReworkHours * inputs.rate;

  const hoursSavedPerYear = Math.round(annualReworkHours * velocityReclaimPct);
  const debtCostPerYear = Math.round(hoursSavedPerYear * inputs.rate);
  const withSystem = Math.round(withoutSystem - debtCostPerYear);

  return {
    hoursSavedPerYear,
    debtCostPerYear,
    velocityReclaimPct,
    withoutSystem: Math.round(withoutSystem),
    withSystem,
  };
}

// ─── URL param helpers ───────────────────────────────────────────────────────
// Shareable results: ?i=team.surfaces.rate.reworkHours.level  e.g. ?i=8.3.95.4.m

const LEVEL_CODE: Record<InconsistencyLevel, string> = { low: 'l', medium: 'm', high: 'h' };
const CODE_LEVEL: Record<string, InconsistencyLevel> = { l: 'low', m: 'medium', h: 'high' };

export function encodeInputs(inputs: RoiInputs): string {
  const n = normalize(inputs);
  return [n.team, n.surfaces, n.rate, n.reworkHours, LEVEL_CODE[n.inconsistency]].join('.');
}

export const VALID_PARAM_RE = /^\d{1,3}\.\d{1,2}\.\d{1,3}\.\d{1,4}(\.\d{1,2})?\.[lmh]$/;

export function decodeInputs(param: string): RoiInputs | null {
  if (!VALID_PARAM_RE.test(param)) return null;
  const parts = param.split('.');
  const level = CODE_LEVEL[parts[parts.length - 1]];
  if (!level) return null;
  // reworkHours may be a decimal ("4.5"), so it can occupy one or two slots.
  const [team, surfaces, rate] = parts;
  const reworkHours = parts.length === 6 ? `${parts[3]}.${parts[4]}` : parts[3];
  return normalize({
    team: parseInt(team, 10),
    surfaces: parseInt(surfaces, 10),
    rate: parseInt(rate, 10),
    reworkHours: parseFloat(reworkHours),
    inconsistency: level,
  });
}

// ─── Formatting ──────────────────────────────────────────────────────────────

export function formatCurrency(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}
