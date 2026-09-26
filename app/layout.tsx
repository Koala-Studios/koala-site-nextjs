import "./globals.css";
import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { Suspense } from "react";
import { preload } from "react-dom";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CtaAnalytics } from "@/components/site/CtaAnalytics";
import { AttributionTracker } from "@/components/site/AttributionTracker";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { siteSettings } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteSettings.defaultSeo.title,
    description: siteSettings.defaultSeo.description,
    path: siteSettings.defaultSeo.canonicalPath ?? "/",
  }),
  verification: {
    google: "t23HTN1oMQl0KcX3f9KqM5QxHd72M0gl3h7DA7d9ksk",
  },
};

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const socialProfiles = Object.values(siteSettings.social).filter(Boolean);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: siteSettings.name,
  url: siteSettings.url,
  logo: `${siteSettings.url}/images/brand/koala-wordmark.png`,
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
  // The wordmark is a CSS mask (fetched in CORS mode), which the browser would
  // otherwise find only after parsing CSS.
  preload("/images/brand/koala-wordmark.svg", { as: "image", fetchPriority: "high", crossOrigin: "anonymous" });

  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <body>
        <Suspense fallback={null}><AttributionTracker /></Suspense>
        <GoogleAnalytics />
        <CtaAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <a className="koala-skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
