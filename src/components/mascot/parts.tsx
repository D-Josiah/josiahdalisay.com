/**
 * Shared geometry for the bug mascot. The body is drawn once here and the
 * face is layered on top, so the walking, idle and peeking poses stay in
 * sync if the character is ever redrawn.
 *
 * Coordinates are in the mascot's own space (viewBox "70 25 150 125").
 */

const ink = "#1a1a1a";
const orange = "#FF4500";
const yellow = "#FFC900";

/** One leg: a curved stroke ending in a foot. */
function Leg({ d, foot }: { d: string; foot: readonly [number, number] }) {
  const [cx, cy] = foot;
  return (
    <>
      {/* A lit core over a dark base turns the flat stroke into a tube. */}
      <path d={d} fill="none" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke="#5a5a5a"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".5"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx="7"
        ry="4"
        fill="url(#bug-shell)"
        stroke={ink}
        strokeWidth="1.8"
      />
    </>
  );
}

const legs = [
  { d: "M106 105 C96 115 90 123 86 131", foot: [84, 133] as const, origin: "106px 105px" },
  {
    d: "M120 109 C113 119 108 127 106 135",
    foot: [105, 137] as const,
    origin: "120px 109px",
  },
  {
    d: "M160 109 C167 119 172 127 174 135",
    foot: [175, 137] as const,
    origin: "160px 109px",
  },
  {
    d: "M174 105 C184 115 190 123 194 131",
    foot: [196, 133] as const,
    origin: "174px 105px",
  },
];

/** All four legs; `walking` adds the staggered swing animation. */
export function Legs({ walking = false }: { walking?: boolean }) {
  return (
    <>
      {legs.map((leg, i) => (
        <g
          key={leg.d}
          style={
            walking
              ? {
                  animation: `leg-swing .4s ease-in-out infinite ${i * 0.1}s`,
                  transformOrigin: leg.origin,
                }
              : undefined
          }
        >
          <Leg d={leg.d} foot={leg.foot} />
        </g>
      ))}
    </>
  );
}

/** Antenna, shell and cheeks — everything behind the face. */
export function Shell() {
  return (
    <>
      {/* Contact shadow, so it stands on the ground instead of floating. */}
      <ellipse cx="140" cy="128" rx="46" ry="9" fill="url(#bug-ground)" />
      <line
        x1="140"
        y1="53"
        x2="140"
        y2="39"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="140" cy="36" r="4.5" fill="url(#bug-bulb)" stroke={ink} strokeWidth="2" />
      <circle cx="138.5" cy="34.5" r="1.4" fill="#FFF" opacity=".8" />
      <rect
        x="96"
        y="53"
        width="88"
        height="58"
        rx="27"
        fill="url(#bug-shell)"
        stroke={ink}
        strokeWidth="2.5"
      />
      {/* Shadow the dome casts onto the shell just below it. */}
      <path
        d="M96 75 C110 86 170 86 184 75 L184 83 C170 94 110 94 96 83 Z"
        fill="#000"
        opacity=".16"
      />
      <path
        d="M96 75 C96 60 106 53 123 53 L157 53 C174 53 184 60 184 75 Z"
        fill="url(#bug-dome)"
      />
      {/* Specular streak across the dome. */}
      <ellipse
        cx="124"
        cy="62"
        rx="17"
        ry="6"
        fill="url(#bug-gloss)"
        transform="rotate(-12 124 62)"
      />
      <ellipse cx="108" cy="89" rx="6" ry="3" fill="#B82B00" opacity=".3" />
      <ellipse cx="172" cy="89" rx="6" ry="3" fill="#B82B00" opacity=".3" />
      {/* Bounce light along the lower-left curve. */}
      <ellipse
        cx="117"
        cy="100"
        rx="13"
        ry="5"
        fill="url(#bug-gloss)"
        opacity=".45"
        transform="rotate(-18 117 100)"
      />
    </>
  );
}

/** The two white eye panels every expression sits inside. */
export function EyeWhites() {
  return (
    <>
      <rect
        x="112"
        y="61"
        width="22"
        height="15"
        rx="6"
        fill="url(#bug-eye)"
        stroke={ink}
        strokeWidth="2.5"
      />
      <rect
        x="146"
        y="61"
        width="22"
        height="15"
        rx="6"
        fill="url(#bug-eye)"
        stroke={ink}
        strokeWidth="2.5"
      />
    </>
  );
}

/** A glowing laptop, used in the peeking and crawling poses. */
export function Laptop({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <rect
        x="-24"
        y="-1"
        width="52"
        height="5"
        rx="2.5"
        fill="#FAFAF8"
        stroke={ink}
        strokeWidth="1.4"
      />
      <rect
        x="-21"
        y="-27"
        width="38"
        height="26"
        rx="3"
        fill={ink}
        stroke={ink}
        strokeWidth="1.6"
      />
      <rect x="-18.5" y="-24" width="33" height="20" rx="2" fill={ink} />
      <g style={{ animation: "glow 2s ease-in-out infinite" }}>
        <line
          x1="-15"
          y1="-18"
          x2="-1"
          y2="-18"
          stroke="#23A094"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="-15"
          y1="-13"
          x2="8"
          y2="-13"
          stroke={yellow}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="-12"
          y1="-8"
          x2="4"
          y2="-8"
          stroke={orange}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

export const mascotInk = ink;
export const mascotOrange = orange;
export const mascotYellow = yellow;
