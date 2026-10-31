/** Green "Live" pill with the pulsing dot from the prototype. */
export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-[5px] rounded-[20px] bg-[#27CA40] px-3 py-1 text-xs font-bold text-white">
      <span
        aria-hidden
        className="inline-block size-[7px] animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-white"
      />
      Live
    </span>
  );
}
