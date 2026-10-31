import type { Metadata } from "next";
import { DisciplinePage } from "@/components/sections/DisciplinePage";
import { getDiscipline } from "@/content/services";

const discipline = getDiscipline("marketing");

export const metadata: Metadata = {
  title: "Marketing Services",
  description: discipline.detail.map((item) => item.title).join(" · "),
  alternates: { canonical: "/marketing" },
};

export default function MarketingPage() {
  return <DisciplinePage discipline={discipline} />;
}
