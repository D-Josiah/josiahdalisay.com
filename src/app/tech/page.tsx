import type { Metadata } from "next";
import { DisciplinePage } from "@/components/sections/DisciplinePage";
import { getDiscipline } from "@/content/services";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";

const discipline = getDiscipline("tech");

export const metadata: Metadata = {
  title: "Tech Services",
  description: discipline.metaDescription,
  alternates: { canonical: "/tech" },
};

export default function TechPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Trusted, locally built JSON; nothing here comes from user input.
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ name: "Home", path: "/" }])),
        }}
      />
      <DisciplinePage discipline={discipline} />
    </>
  );
}
