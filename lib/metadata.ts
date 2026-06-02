import type { Metadata } from "next";

import { createBaseMetadata } from "@/lib/seo";
import { getCaseStudyPath } from "@/lib/routes";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export type CaseStudyMetadataInput = {
  slug: string;
  title: string;
  clientName: string;
  summary: string;
  image?: string;
  keywords?: string[];
};

export function createPageMetadata(input: PageMetadataInput): Metadata {
  return createBaseMetadata({
    title: input.title,
    description: input.description,
    path: input.path,
    image: input.image,
    keywords: input.keywords,
    openGraphType: "website",
  });
}

export function createCaseStudyMetadata(
  input: CaseStudyMetadataInput
): Metadata {
  return createBaseMetadata({
    title: `${input.clientName} Case Study`,
    description: input.summary,
    path: getCaseStudyPath(input.slug),
    image: input.image,
    keywords: [input.clientName, "case study", ...(input.keywords ?? [])],
    openGraphType: "article",
  });
}

export function createNoIndexMetadata(metadata: Metadata = {}): Metadata {
  return {
    ...metadata,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
