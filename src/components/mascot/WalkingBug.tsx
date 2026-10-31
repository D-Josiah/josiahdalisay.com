import { faceCycle } from "./faces";
import { Legs, Shell } from "./parts";

/**
 * The bug that paces back and forth above the contact form, cycling
 * through all six expressions.
 *
 * Expression swapping is declarative SMIL (`<animate>`) rather than React
 * state: it needs no JavaScript, costs no hydration, and stays in step
 * with the walk cycle on its own.
 */

const KEY_TIMES = "0;0.14;0.167;0.31;0.333;0.48;0.5;0.64;0.667;0.81;0.833;0.97;1";
const SLOTS = KEY_TIMES.split(";").length; // 13

/** Opacity track that holds face `index` visible for its slot only. */
function visibilityValues(index: number): string {
  return Array.from({ length: SLOTS }, (_, slot) => {
    const onForSlot = slot === index * 2 || slot === index * 2 + 1;
    // The first face also closes the loop so the cycle wraps seamlessly.
    const closesLoop = index === 0 && slot === SLOTS - 1;
    return onForSlot || closesLoop ? "1" : "0";
  }).join(";");
}

export function WalkingBug({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="relative h-[55px] overflow-visible">
        <svg
          viewBox="70 25 145 120"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 z-[2] w-[70px]"
          style={{ animation: "walk-across 18s ease-in-out infinite" }}
        >
          <g style={{ animation: "body-bounce .4s ease-in-out infinite" }}>
            <Legs walking />
            <Shell />
            {faceCycle.map((Face, index) => (
              <g key={index}>
                <animate
                  attributeName="opacity"
                  dur="18s"
                  repeatCount="indefinite"
                  values={visibilityValues(index)}
                  keyTimes={KEY_TIMES}
                />
                <Face />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
