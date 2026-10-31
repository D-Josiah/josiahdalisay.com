/**
 * The paint filters, defined once for the whole document.
 *
 * `feTurbulence` is expensive to evaluate, and the page paints a dozen or
 * more blocks. Declaring the filter graph once and referencing it by id
 * keeps a single definition in the document instead of one per element.
 *
 * Rendered from the root layout. Ids are document-global, so this must
 * appear exactly once.
 */

type EdgeSpec = {
  id: string;
  /** Cycles per user unit: higher packs more curves along the edge. */
  baseFrequency: number;
  /**
   * Octaves of noise. One gives a single smooth wave and so flowing
   * curves; adding octaves layers finer detail on top and the edge
   * starts to read as torn.
   */
  octaves: number;
  scale: number;
  /** Rounds the silhouette before it is re-hardened. */
  blur: number;
};

/**
 * Tuned against PaintPanel's 1200x700 user space. These are user-space
 * units, not pixels, so they only mean what they mean at that viewBox.
 */
const edges: readonly EdgeSpec[] = [
  { id: "paint-edge-strong", baseFrequency: 0.0075, octaves: 1, scale: 26, blur: 3 },
];

export const paintEdgeIds = {
  strong: edges[0].id,
} as const;

export type PaintEdge = keyof typeof paintEdgeIds;

export function PaintFilters() {
  return (
    <svg aria-hidden className="pointer-events-none absolute size-0" focusable="false">
      <defs>
        {edges.map(({ id, baseFrequency, octaves, scale, blur }) => (
          <filter key={id} id={id} x="-10%" y="-10%" width="120%" height="120%">
            {/* Ragged, brushed boundary. */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={octaves}
              seed="9"
              result="edgeNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="edgeNoise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Blur then threshold: the blur rounds off the jagged steps the
                displacement leaves behind, and the steep alpha ramp snaps the
                result back to a hard edge. Blurring alone would leave the
                paint feathered into the canvas. */}
            <feGaussianBlur in="displaced" stdDeviation={blur} result="rounded" />
            <feComponentTransfer in="rounded" result="shape">
              {/* Crosses 0.5 alpha at the original boundary, so the shape
                  neither grows nor shrinks. The slope is steep enough to
                  read as solid but not so steep that it clips away the
                  antialiasing — a near-vertical ramp leaves a stair-stepped
                  edge on the shallow curves. */}
              <feFuncA type="linear" slope="10" intercept="-4.5" />
            </feComponentTransfer>

            {/* Patchy, matte coverage inside that shape. */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="4"
              seed="3"
              result="grain"
            />
            <feColorMatrix in="grain" type="saturate" values="0" result="greyGrain" />
            <feComponentTransfer in="greyGrain" result="softGrain">
              {/* Squeeze the grain into a narrow band near white, so the
                  multiply mottles the paint instead of dirtying it. */}
              <feFuncR type="linear" slope="0.3" intercept="0.72" />
              <feFuncG type="linear" slope="0.3" intercept="0.72" />
              <feFuncB type="linear" slope="0.3" intercept="0.72" />
            </feComponentTransfer>
            <feComposite in="softGrain" in2="shape" operator="in" result="grainInShape" />
            <feBlend in="grainInShape" in2="shape" mode="multiply" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
