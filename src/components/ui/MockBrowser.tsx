import { cn } from "@/lib/cn";

const dots = ["#FF5F56", "#FFBD2E", "#27CA40"];

/** Decorative browser chrome used as a stand-in site preview. */
export function MockBrowser({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden={!children}
      className={cn(
        "mt-3 overflow-hidden rounded-lg border-[1.5px] border-black/20 bg-white",
        className,
      )}
    >
      <div className="flex gap-1 border-b border-black/10 bg-white px-2 py-1.5">
        {dots.map((color) => (
          <span
            key={color}
            className="size-[7px] rounded-full"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="min-h-[60px] bg-white p-2.5">
        <div className="mb-1.5 h-2 w-1/2 rounded-sm bg-black/15" />
        <div className="mb-1.5 h-1.5 w-3/4 rounded-sm bg-black/10" />
        <div className="mb-1.5 h-1.5 w-3/5 rounded-sm bg-black/10" />
        {children}
      </div>
    </div>
  );
}
