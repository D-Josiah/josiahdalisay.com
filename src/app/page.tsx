import { BuildsTeaser } from "@/components/sections/BuildsTeaser";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Needs } from "@/components/sections/Needs";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { ToolMarquee } from "@/components/sections/ToolMarquee";
import { Separator } from "@/components/ui/Separator";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolMarquee />
      <Needs />
      <Projects />
      <Separator />
      <BuildsTeaser />
      <Separator />
      <Contact />
      <Process />
    </>
  );
}
