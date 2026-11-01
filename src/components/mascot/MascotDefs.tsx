/**
 * Shading gradients for the bug mascot, defined once for the document.
 *
 * The mascot is drawn in several poses and in a client component, so the
 * gradients live here and every pose references them by id rather than
 * each carrying its own copy. Ids are document-global, so this must be
 * rendered exactly once — it sits in the root layout.
 *
 * Lighting is consistent across every gradient: the key light is above
 * and to the left, so highlights sit top-left and shadow gathers at the
 * bottom-right. Mixing those directions is what makes shaded flat art
 * read as stickers instead of volume.
 */
export function MascotDefs() {
  return (
    <svg aria-hidden className="pointer-events-none absolute size-0" focusable="false">
      <defs>
        {/* Shell: lit crown, saturated midtone, shadowed underside. */}
        <radialGradient id="bug-shell" cx="32%" cy="18%" r="92%">
          <stop offset="0%" stopColor="#FF8A5C" />
          <stop offset="45%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#B82B00" />
        </radialGradient>

        {/* Head dome: near-black, lifted just enough to separate from the ink outline. */}
        <linearGradient id="bug-dome" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#434343" />
          <stop offset="55%" stopColor="#1f1f1f" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>

        {/* Eye panels: faint dish, so the pupils sit inside rather than on top. */}
        <linearGradient id="bug-eye" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCDCDC" />
        </linearGradient>

        {/* Antenna bulb. */}
        <radialGradient id="bug-bulb" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFF0A8" />
          <stop offset="55%" stopColor="#FFC900" />
          <stop offset="100%" stopColor="#D79E00" />
        </radialGradient>

        {/* Specular bloom, faded to nothing so it has no visible rim. */}
        <radialGradient id="bug-gloss" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* Contact shadow on the ground. */}
        <radialGradient id="bug-ground" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
