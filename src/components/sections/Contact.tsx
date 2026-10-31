import { ContactForm } from "@/components/contact/ContactForm";
import { BackToTop } from "@/components/mascot/BackToTop";
import { WalkingBug } from "@/components/mascot/WalkingBug";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-8 py-22 text-center">
      <h2 className="font-display mb-3.5 text-[clamp(32px,5vw,58px)] tracking-[-2px]">
        Let&rsquo;s build <em className="pr-1.5">something</em> together.
      </h2>

      <div className="relative mx-auto max-w-[560px]">
        <WalkingBug />

        <div className="rounded-panel border-ink relative z-10 border-2 bg-white p-9 shadow-[6px_6px_0_var(--color-yellow)]">
          <ContactForm />
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-[560px] justify-end">
        <BackToTop />
      </div>
    </section>
  );
}
