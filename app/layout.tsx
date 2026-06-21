import "./globals.css";
import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CtaAnalytics } from "@/components/site/CtaAnalytics";
import { CursorDot } from "@/components/site/CursorDot";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: siteSettings.defaultSeo.title,
  description: siteSettings.defaultSeo.description,
  path: siteSettings.defaultSeo.canonicalPath ?? "/",
});

const socialProfiles = Object.values(siteSettings.social).filter(Boolean);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: siteSettings.name,
  url: siteSettings.url,
  logo: `${siteSettings.url}/images/koala_logo_white.png`,
  email: "hello@koalastudios.ca",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  areaServed: ["Canada", "United States"],
  ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteSettings.name,
  url: siteSettings.url,
  description: siteSettings.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/BebasNeue-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <CtaAnalytics />
        <SmoothScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <a className="koala-skip-link" href="#main-content">
          Skip to content
        </a>
        <CursorDot />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
