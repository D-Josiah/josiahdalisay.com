import type { Metadata } from "next";
import { DisciplinePage } from "@/components/sections/DisciplinePage";
import { getDiscipline } from "@/content/services";

const discipline = getDiscipline("tech");

export const metadata: Metadata = {
  title: "Tech Services",
  description: discipline.detail.map((item) => item.title).join(" · "),
  alternates: { canonical: "/tech" },
};

export default function TechPage() {
  return <DisciplinePage discipline={discipline} />;
}
