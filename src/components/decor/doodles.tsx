/**
 * Hand-drawn doodle vocabulary: the album-art reference's scattered,
 * white-on-colour marker style, redrawn around code, Claude and the
 * work-from-home desk.
 *
 * Every doodle strokes in `currentColor` and fills with the CSS variable
 * `--doodle-fill`, so one layer can be retinted for an orange, cream or
 * ink background without duplicating any geometry.
 */

const fill = "var(--doodle-fill)";

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const thin = { ...stroke, strokeWidth: 2 } as const;

/* ---------------------------------------------------------------- code */

/** A `</>` tag sitting in a speech-bubble blob. */
export function CodeTag() {
  return (
    <svg viewBox="0 0 104 92" fill="none">
      <path
        d="M14 36C10 18 28 8 52 8s42 10 38 29c-3 16-19 25-38 25h-7l-17 14 3-16C21 56 16 47 14 36z"
        fill={fill}
        {...stroke}
      />
      <path d="M40 27l-12 10 12 10M64 27l12 10-12 10M56 24l-8 26" fill="none" {...thin} />
    </svg>
  );
}

/** Terminal window with a prompt and two output lines. */
export function Terminal() {
  return (
    <svg viewBox="0 0 100 78" fill="none">
      <rect x="6" y="8" width="88" height="62" rx="8" fill={fill} {...stroke} />
      <path d="M6 24h88" {...thin} />
      <circle cx="17" cy="16" r="2.6" fill="currentColor" />
      <circle cx="27" cy="16" r="2.6" fill="currentColor" />
      <path d="M20 38l8 7-8 7M34 52h16M20 62h30" fill="none" {...thin} />
    </svg>
  );
}

/** Curly braces wrapping nothing in particular. */
export function Braces() {
  return (
    <svg viewBox="0 0 86 80" fill="none">
      <path
        d="M34 10c-10 0-12 6-12 14s-2 12-10 16c8 4 10 8 10 16s2 14 12 14"
        fill="none"
        {...stroke}
      />
      <path
        d="M52 10c10 0 12 6 12 14s2 12 10 16c-8 4-10 8-10 16s-2 14-12 14"
        fill="none"
        {...stroke}
      />
      <circle cx="43" cy="40" r="3" fill="currentColor" />
    </svg>
  );
}

/** Git branch: trunk, fork and merge. */
export function GitBranch() {
  return (
    <svg viewBox="0 0 72 92" fill="none">
      <path d="M22 16v60" fill="none" {...stroke} />
      <path d="M22 36c0 12 28 8 28 20" fill="none" {...stroke} />
      <circle cx="22" cy="14" r="7" fill={fill} {...stroke} />
      <circle cx="22" cy="78" r="7" fill={fill} {...stroke} />
      <circle cx="52" cy="58" r="7" fill={fill} {...stroke} />
    </svg>
  );
}

/** Blinking-cursor text caret, drawn as a chunky I-beam. */
export function Caret() {
  return (
    <svg viewBox="0 0 48 76" fill="none">
      <path d="M12 10h24M12 66h24M24 10v56" fill="none" {...stroke} />
    </svg>
  );
}

/* -------------------------------------------------------------- Claude */

/** Claude's starburst, redrawn freehand. */
export function Sparkle() {
  return (
    <svg viewBox="0 0 84 84" fill="none">
      <path
        d="M42 6c3 17 6 25 11 30 5 5 13 8 25 6-12 4-20 7-25 12-5 5-8 13-11 28-3-15-6-23-11-28-5-5-13-8-25-12 12 2 20-1 25-6 5-5 8-13 11-30z"
        fill={fill}
        {...stroke}
      />
    </svg>
  );
}

/** Vertical bar graph climbing to the right. */
export function BarGraph() {
  return (
    <svg viewBox="0 0 92 88" fill="none">
      <path d="M12 8v68h72" fill="none" {...stroke} />
      <rect x="24" y="52" width="14" height="24" fill={fill} {...stroke} />
      <rect x="44" y="36" width="14" height="40" fill={fill} {...stroke} />
      <rect x="64" y="18" width="14" height="58" fill={fill} {...stroke} />
    </svg>
  );
}

/** Smaller four-point spark used as filler. */
export function Spark() {
  return (
    <svg viewBox="0 0 54 54" fill="none">
      <path
        d="M27 6c2 11 4 16 7 19s8 5 14 4c-6 2-11 4-14 7s-5 8-7 18c-2-10-4-15-7-18s-8-5-14-7c6 1 11-1 14-4s5-8 7-19z"
        fill={fill}
        {...stroke}
        strokeWidth={2}
      />
    </svg>
  );
}

/** Chat bubble with the three-dot "thinking" state. */
export function ChatBubble() {
  return (
    <svg viewBox="0 0 96 80" fill="none">
      <path
        d="M10 32C10 17 26 8 48 8s38 9 38 24-16 24-38 24h-9L23 70l3-14C16 51 10 42 10 32z"
        fill={fill}
        {...stroke}
      />
      <circle cx="34" cy="32" r="3.4" fill="currentColor" />
      <circle cx="48" cy="32" r="3.4" fill="currentColor" />
      <circle cx="62" cy="32" r="3.4" fill="currentColor" />
    </svg>
  );
}

/* ----------------------------------------------------------------- wfh */

/** Laptop, lid open, three code lines on screen. */
export function Laptop() {
  return (
    <svg viewBox="0 0 104 76" fill="none">
      <rect x="18" y="8" width="68" height="46" rx="6" fill={fill} {...stroke} />
      <path d="M8 62h88l-8-8H16z" fill={fill} {...stroke} />
      <path d="M30 24h22M30 33h34M30 42h16" fill="none" {...thin} />
    </svg>
  );
}

/** Steaming mug. */
export function Mug() {
  return (
    <svg viewBox="0 0 86 90" fill="none">
      <path d="M16 36h48v28c0 10-8 16-24 16s-24-6-24-16z" fill={fill} {...stroke} />
      <path d="M64 44h8c7 0 11 5 11 11s-4 11-11 11h-8" fill="none" {...stroke} />
      <path d="M30 24c0-6 6-6 6-12M46 24c0-6 6-6 6-12" fill="none" {...thin} />
    </svg>
  );
}

/** Desk plant — the one organic shape kept from the reference. */
export function DeskPlant() {
  return (
    <svg viewBox="0 0 72 92" fill="none">
      <path d="M36 58V30" fill="none" {...stroke} />
      <path d="M36 42c-14 0-20-8-20-18 12-2 20 5 20 18z" fill={fill} {...stroke} />
      <path d="M36 36c12-2 18-10 16-21-12 1-17 9-16 21z" fill={fill} {...stroke} />
      <path d="M18 58h36l-5 26H23z" fill={fill} {...stroke} />
    </svg>
  );
}

/** Headphones, for the focus block. */
export function Headphones() {
  return (
    <svg viewBox="0 0 92 80" fill="none">
      <path d="M14 54V44c0-18 14-32 32-32s32 14 32 32v10" fill="none" {...stroke} />
      <rect x="6" y="48" width="18" height="24" rx="8" fill={fill} {...stroke} />
      <rect x="68" y="48" width="18" height="24" rx="8" fill={fill} {...stroke} />
    </svg>
  );
}

/** Wifi arcs. */
export function Wifi() {
  return (
    <svg viewBox="0 0 76 60" fill="none">
      <path d="M6 22C14 13 25 8 38 8s24 5 32 14" fill="none" {...stroke} />
      <path d="M17 33c6-6 13-9 21-9s15 3 21 9" fill="none" {...stroke} />
      <path d="M28 44c3-3 6-5 10-5s7 2 10 5" fill="none" {...stroke} />
      <circle cx="38" cy="54" r="3.4" fill="currentColor" />
    </svg>
  );
}

/** Sticky note with two scribbled lines. */
export function StickyNote() {
  return (
    <svg viewBox="0 0 78 80" fill="none">
      <path d="M8 8h62v46L44 72H8z" fill={fill} {...stroke} />
      <path d="M44 72V54h26" fill="none" {...stroke} />
      <path d="M22 26h32M22 38h22" fill="none" {...thin} />
    </svg>
  );
}

/* ------------------------------------------------------- abstract marks */

/** Scatter of hollow dots, straight from the reference. */
export function DotArc() {
  return (
    <svg viewBox="0 0 64 64" fill="none">
      {(
        [
          [8, 10, 4],
          [22, 5, 3.2],
          [36, 9, 2.6],
          [10, 26, 3],
          [24, 22, 2.4],
          [7, 43, 2.6],
          [20, 40, 2],
          [6, 58, 2],
        ] as const
      ).map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="none" {...thin} />
      ))}
    </svg>
  );
}

/** Flicked arrow with motion ticks. */
export function Flick() {
  return (
    <svg viewBox="0 0 72 72" fill="none">
      <path d="M10 60C18 36 34 18 60 10" fill="none" {...stroke} />
      <path d="M46 10h15v15" fill="none" {...stroke} />
      <path d="M6 46c4-2 7-2 10 0M14 34c4-2 7-2 10 0" fill="none" {...thin} />
    </svg>
  );
}

/** Dot-filled blob — the reference's orange pebble. */
export function DottedBlob() {
  return (
    <svg viewBox="0 0 110 62" fill="none">
      <path
        d="M14 34C8 18 26 6 48 8c13 1 18 6 27 5 13-1 23 8 21 20-2 14-23 24-47 22C27 54 17 46 14 34z"
        fill={fill}
        {...stroke}
      />
      {(
        [
          [34, 26],
          [52, 22],
          [70, 27],
          [86, 33],
          [30, 40],
          [48, 37],
          [66, 41],
          [84, 45],
        ] as const
      ).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Concentric rings. */
export function Rings() {
  return (
    <svg viewBox="0 0 70 70" fill="none">
      <circle cx="35" cy="35" r="26" fill={fill} {...stroke} />
      <circle cx="35" cy="35" r="13" fill="none" {...stroke} />
      <circle cx="35" cy="35" r="3" fill="currentColor" />
    </svg>
  );
}
