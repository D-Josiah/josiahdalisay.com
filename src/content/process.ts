export const processSteps = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "We hop on a quick call to understand what you need and where things are stuck.",
    tone: "yellow" as const,
  },
  {
    step: 2,
    title: "Build",
    description: "I handle the tech and marketing. You stay focused on your business.",
    tone: "orange" as const,
  },
  {
    step: 3,
    title: "Launch + Support",
    description:
      "Everything goes live. I train you on your systems and stick around to help.",
    tone: "teal" as const,
  },
] as const;
