import {
  Laptop,
  mascotInk as ink,
  mascotOrange as orange,
  mascotYellow as yellow,
} from "./parts";

/**
 * The bug peeking over the "Projects" heading, tilted and blinking
 * between a smile and a puzzled look.
 *
 * This pose has its own geometry rather than reusing `parts` — the body
 * is rotated and the legs are splayed differently, so sharing would mean
 * more props than it saves.
 */

const BLINK = {
  dur: "5s",
  repeatCount: "indefinite",
  keyTimes: "0;0.4;0.5;0.9;1",
} as const;

const legs = [
  { d: "M196 152 C206 160 210 168 212 176", foot: [214, 178] },
  { d: "M178 156 C184 164 187 172 188 180", foot: [188, 182] },
  { d: "M156 150 C148 158 138 166 126 170", foot: [119, 171] },
  { d: "M160 156 C152 168 146 178 144 184", foot: [142, 186] },
] as const;

export function PeekBug({ className }: { className?: string }) {
  return (
    <svg
      viewBox="52 50 190 152"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <g
        style={{ animation: "bob 2s ease-in-out infinite", transformOrigin: "170px 130px" }}
      >
        <line
          x1="176"
          y1="102"
          x2="178"
          y2="88"
          stroke={ink}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="178" cy="85" r="4.5" fill={yellow} stroke={ink} strokeWidth="2" />
        <rect
          x="130"
          y="102"
          width="88"
          height="56"
          rx="26"
          fill={orange}
          stroke={ink}
          strokeWidth="2.5"
          transform="rotate(-6 174 130)"
        />
        <g transform="rotate(-6 174 130)">
          <path
            d="M130 123 C130 109 140 102 156 102 L192 102 C208 102 218 109 218 123 Z"
            fill={ink}
          />
          <rect
            x="140"
            y="110"
            width="22"
            height="15"
            rx="6"
            fill="#FFF"
            stroke={ink}
            strokeWidth="2.5"
          />
          <rect
            x="174"
            y="110"
            width="22"
            height="15"
            rx="6"
            fill="#FFF"
            stroke={ink}
            strokeWidth="2.5"
          />

          {/* Eyes forward */}
          <g>
            <animate attributeName="opacity" values="1;1;0;0;1" {...BLINK} />
            <ellipse cx="148" cy="119" rx="4" ry="3" fill={ink} />
            <ellipse cx="182" cy="119" rx="4" ry="3" fill={ink} />
            <circle cx="150" cy="117" r="1.3" fill="#FFF" />
            <circle cx="184" cy="117" r="1.3" fill="#FFF" />
          </g>
          {/* Eyes askew, with a question mark */}
          <g>
            <animate attributeName="opacity" values="0;0;1;1;0" {...BLINK} />
            <ellipse cx="150" cy="114" rx="4" ry="3" fill={ink} />
            <ellipse cx="180" cy="121" rx="4" ry="3" fill={ink} />
            <text
              x="228"
              y="100"
              fontFamily="monospace"
              fontSize="14"
              fontWeight="500"
              fill={ink}
            >
              ?
            </text>
          </g>

          <ellipse cx="142" cy="138" rx="6" ry="3" fill={orange} opacity=".22" />

          {/* Smile */}
          <g>
            <animate attributeName="opacity" values="1;1;0;0;1" {...BLINK} />
            <path
              d="M162 140 C166 145 174 145 178 140"
              fill="none"
              stroke={ink}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
          {/* Unsure squiggle */}
          <g>
            <animate attributeName="opacity" values="0;0;1;1;0" {...BLINK} />
            <path
              d="M162 142 C166 138 171 143 177 139"
              fill="none"
              stroke={ink}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      <Laptop transform="translate(94 170) rotate(-4) scale(1.08)" />

      {legs.map(({ d, foot }) => (
        <g key={d}>
          <path d={d} fill="none" stroke={ink} strokeWidth="5.5" strokeLinecap="round" />
          <ellipse
            cx={foot[0]}
            cy={foot[1]}
            rx="7"
            ry="4"
            fill={orange}
            stroke={ink}
            strokeWidth="1.8"
          />
        </g>
      ))}
    </svg>
  );
}
