import { FaceDefault } from "./faces";
import { Legs, Shell } from "./parts";

/** Standing, bobbing bug with its default expression. */
export function IdleBug({ className }: { className?: string }) {
  return (
    <svg
      viewBox="70 25 150 125"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <g>
        <Legs />
        <Shell />
        <FaceDefault />
      </g>
    </svg>
  );
}
