import { pageContent } from "@/lib/content";

export const servicesContent = {
  ...pageContent.services,
  hero: {
    ...pageContent.services.hero,
    points: [
      "Clearer offer",
      "Better page structure",
      "Frontend that holds up",
    ],
  },
  proof: [
    {
      label: "Core offers",
      value: "3",
    },
    {
      label: "Typical cadence",
      value: "6-12 weeks",
    },
    {
      label: "Primary focus",
      value: "Ecommerce",
    },
  ],
  offerings: [
    {
      title: "Strategy",
      copy:
        "Clarify the offer and proof.",
      note: "Best when the offer needs clarity before design starts.",
    },
    {
      title: "Design",
      copy:
        "Shape a system that stays consistent.",
      note: "Best when the brand needs a stronger point of view.",
    },
    {
      title: "Development",
      copy:
        "Build clean pages that hold up.",
      note: "Best when the site needs to launch cleanly.",
    },
  ],
  delivery: [
    {
      title: "Discovery with a point of view",
      copy:
        "We decide the story, the proof, and the main decisions up front.",
    },
    {
      title: "Design built around hierarchy",
      copy:
        "We build the page around hierarchy so the message lands fast.",
    },
    {
      title: "Build with governance in place",
      copy:
        "We keep the build organized so the site stays easy to edit after launch.",
    },
  ],
  fitNotes: [
    "Ecommerce brands that need a clearer message",
    "Teams that want a stronger site without a heavy process",
    "Projects where design, proof, and build quality all matter",
  ],
  cta: {
    eyebrow: "Next step",
    title: "Start a project.",
    summary:
      "The page should make fit obvious before the first call.",
  },
};

export type ServicesContent = typeof servicesContent;
