import type { Metadata } from "next";

import { createBaseMetadata } from "@/lib/seo";
import { getBlogPostPath, getCaseStudyPath } from "@/lib/routes";

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

export type BlogPostMetadataInput = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags?: string[];
  image?: string;
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

export function createBlogPostMetadata(input: BlogPostMetadataInput): Metadata {
  return createBaseMetadata({
    title: input.title,
    description: input.description,
    path: getBlogPostPath(input.slug),
    image: input.image,
    keywords: input.tags,
    openGraphType: "article",
    article: {
      publishedTime: input.publishedAt,
      modifiedTime: input.updatedAt,
      authors: [input.author],
      tags: input.tags,
    },
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
