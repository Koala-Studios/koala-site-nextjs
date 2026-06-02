import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

type OpenGraphType = "website" | "article";

export type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  openGraphType?: OpenGraphType;
  keywords?: string[];
};

export function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path: string): string {
  return new URL(ensureLeadingSlash(path), siteConfig.metadataBase).toString();
}

export function resolveImageUrl(imagePath?: string): string {
  return absoluteUrl(imagePath ?? siteConfig.defaultOgImage);
}

export function buildPageTitle(title: string): string {
  return title === siteConfig.name
    ? siteConfig.name
    : `${title} | ${siteConfig.name}`;
}

export function buildKeywords(
  keywords: string[] = []
): NonNullable<Metadata["keywords"]> {
  const baseKeywords = [
    "Koala Studios",
    "ecommerce studio",
    "Shopify design",
    "Shopify development",
  ];

  return Array.from(new Set([...baseKeywords, ...keywords]));
}

export function createBaseMetadata(input: MetadataInput): Metadata {
  const path = ensureLeadingSlash(input.path);
  const url = absoluteUrl(path);
  const imageUrl = resolveImageUrl(input.image);
  const title = buildPageTitle(input.title);

  return {
    metadataBase: siteConfig.metadataBase,
    title,
    description: input.description,
    keywords: buildKeywords(input.keywords),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: input.openGraphType ?? "website",
      locale: siteConfig.defaultLocale,
      url,
      title,
      description: input.description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.social.twitter,
      title,
      description: input.description,
      images: [imageUrl],
    },
  };
}
