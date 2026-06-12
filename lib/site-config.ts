const DEFAULT_SITE_URL = "https://koalastudios.ca";
const DEFAULT_OG_IMAGE = "/images/koala_meta.jpg";

function normalizeSiteUrl(value?: string): string {
  const url = value?.trim();

  if (!url) {
    return DEFAULT_SITE_URL;
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: "Koala Studios",
  legalName: "Koala Studios",
  titleTemplate: "%s | Koala Studios",
  description:
    "Koala Studios designs and builds premium ecommerce experiences for ambitious brands.",
  siteUrl,
  metadataBase: new URL(siteUrl),
  defaultLocale: "en-CA",
  defaultOgImage: DEFAULT_OG_IMAGE,
} as const;

export type SiteConfig = typeof siteConfig;
