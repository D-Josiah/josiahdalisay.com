import { cn } from "@/lib/cn";
import { paintEdgeIds, type PaintEdge } from "./PaintFilters";

/**
 * A block of dried paint on canvas: a rectangle pushed through the shared
 * paint filter, which frays its edge and mottles its coverage.
 *
 * The viewBox is fixed at 1200x700 and stretched to the element. That
 * matters more than it looks: a filter's `baseFrequency` and displacement
 * `scale` are in user-space units, so the size of this coordinate system
 * decides how coarse the tear reads. Shrink the viewBox and the same
 * filter turns the torn edge into a fine hairy fringe. Change these
 * numbers and the filter values in `PaintFilters` have to move with them.
 */

const VIEW_W = 1200;
const VIEW_H = 700;

export function PaintPanel({
  color = "#FF4500",
  edge = "strong",
  /** Canvas margin left around the paint, in viewBox units. */
  inset = 26,
  /** Corner rounding in viewBox units, before the edge is frayed. */
  radius = 20,
  className,
}: {
  color?: string;
  edge?: PaintEdge;
  inset?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
    >
      <rect
        x={inset}
        y={inset}
        width={VIEW_W - inset * 2}
        height={VIEW_H - inset * 2}
        rx={radius}
        fill={color}
        filter={`url(#${paintEdgeIds[edge]})`}
      />
    </svg>
  );
}
