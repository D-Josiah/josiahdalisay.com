import { ButtonLink } from "@/components/ui/Button";
import { IdleBug } from "@/components/mascot/IdleBug";

export default function NotFound() {
  return (
    <section className="px-8 py-24 text-center">
      <IdleBug className="mx-auto w-20 animate-[bob_2s_ease-in-out_infinite]" />
      <h1 className="font-display mt-6 text-[clamp(32px,6vw,56px)] tracking-[-2px]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mx-auto mt-3 mb-8 max-w-[420px] text-[17px] text-[#666]">
        Either it moved, or I broke something. Both are possible.
      </p>
      <ButtonLink href="/">Back home</ButtonLink>
    </section>
  );
}
