import { EyeWhites, Laptop, mascotInk as ink, mascotYellow as yellow } from "./parts";

/**
 * The mascot's six expressions. Each is a self-contained <g> so the
 * walking pose can cross-fade between them with SVG <animate>.
 */

const mouth = {
  stroke: ink,
  strokeWidth: 2.2,
  strokeLinecap: "round",
  fill: "none",
} as const;

/** Eyes forward, small smile. */
export function FaceDefault() {
  return (
    <>
      <EyeWhites />
      <ellipse cx="124" cy="69" rx="4" ry="3" fill={ink} />
      <ellipse cx="158" cy="69" rx="4" ry="3" fill={ink} />
      <circle cx="126" cy="67" r="1.3" fill="#FFF" />
      <circle cx="160" cy="67" r="1.3" fill="#FFF" />
      <path d="M132 90 C136 94 144 94 148 90" {...mouth} />
    </>
  );
}

/** `</` and `>` for eyes, flat mouth. */
export function FaceCoding() {
  return (
    <>
      <EyeWhites />
      <text
        x="123"
        y="73"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fontWeight="500"
        fill={ink}
      >
        &lt;/
      </text>
      <text
        x="157"
        y="73"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fontWeight="500"
        fill={ink}
      >
        &gt;
      </text>
      <line
        x1="133"
        y1="91"
        x2="147"
        y2="91"
        stroke={ink}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );
}

/** Misaligned pupils, wavy mouth, floating question mark. */
export function FaceConfused() {
  return (
    <>
      <EyeWhites />
      <ellipse cx="126" cy="65" rx="4" ry="3" fill={ink} />
      <ellipse cx="156" cy="72" rx="4" ry="3" fill={ink} />
      <path d="M132 93 C136 89 141 94 147 90" {...mouth} />
      <text x="196" y="43" fontFamily="monospace" fontSize="16" fontWeight="500" fill={ink}>
        ?
      </text>
    </>
  );
}

/** Crossed-out eyes and orbiting stars. */
export function FaceDizzy() {
  return (
    <>
      <EyeWhites />
      <line
        x1="119"
        y1="64"
        x2="129"
        y2="74"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="129"
        y1="64"
        x2="119"
        y2="74"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="151"
        y1="64"
        x2="161"
        y2="74"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="161"
        y1="64"
        x2="151"
        y2="74"
        stroke={ink}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M130 91 C133 87 137 95 140 91 C143 87 147 95 150 91" {...mouth} />
      <circle cx="182" cy="37" r="4" fill="none" stroke={yellow} strokeWidth="2" />
      <circle cx="196" cy="45" r="3" fill="none" stroke={yellow} strokeWidth="2" />
    </>
  );
}

/** Wide eyes, open grin, lightbulb. */
export function FaceAha() {
  return (
    <>
      <EyeWhites />
      <circle cx="124" cy="68" r="4.6" fill={ink} />
      <circle cx="158" cy="68" r="4.6" fill={ink} />
      <circle cx="126" cy="66" r="1.6" fill="#FFF" />
      <circle cx="160" cy="66" r="1.6" fill="#FFF" />
      <path d="M132 88 C136 96 144 96 148 88 Z" fill={ink} />
      <g style={{ animation: "glow 1.4s ease-in-out infinite" }}>
        <path
          d="M185 41 C185 34 190 29 196 29 C202 29 207 34 207 41 C207 46 203 48 203 52 L189 52 C189 48 185 46 185 41 Z"
          fill={yellow}
          stroke={ink}
          strokeWidth="2"
        />
        <line
          x1="190"
          y1="56"
          x2="202"
          y2="56"
          stroke={ink}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="196"
          y1="21"
          x2="196"
          y2="15"
          stroke={yellow}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="212"
          y1="27"
          x2="217"
          y2="23"
          stroke={yellow}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="180"
          y1="27"
          x2="175"
          y2="23"
          stroke={yellow}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

/** Eyes down, reading the laptop on the ground. */
export function FaceLaptop() {
  return (
    <>
      <Laptop transform="translate(88 108) rotate(-4) scale(.7)" />
      <EyeWhites />
      <ellipse cx="121" cy="71" rx="4" ry="3" fill={ink} />
      <ellipse cx="153" cy="71" rx="4" ry="3" fill={ink} />
      <circle cx="120" cy="70" r="1.3" fill="#FFF" />
      <circle cx="152" cy="70" r="1.3" fill="#FFF" />
      <path d="M132 90 C136 94 144 94 148 90" {...mouth} />
    </>
  );
}

/** Cycle order for the walking pose. */
export const faceCycle = [
  FaceDefault,
  FaceCoding,
  FaceConfused,
  FaceDizzy,
  FaceAha,
  FaceLaptop,
] as const;
