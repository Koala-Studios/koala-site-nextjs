import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createCaseStudyMetadata } from "@/lib/metadata";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/content";
import { getCaseStudyPath, toAbsoluteUrl } from "@/lib/routes";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudyRelated } from "@/components/case-studies/CaseStudyRelated";
import { CaseStudyStory } from "@/components/case-studies/CaseStudyStory";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedCaseStudies().map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {};
  }

  return createCaseStudyMetadata({
    slug: caseStudy.slug,
    title: caseStudy.title,
    clientName: caseStudy.client,
    summary: caseStudy.seo.description,
    image: caseStudy.seo.ogImage ?? caseStudy.media[0]?.src,
    keywords: caseStudy.services,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const related = caseStudy.relatedSlug
    ? getCaseStudyBySlug(caseStudy.relatedSlug)
    : undefined;
  const caseStudyPath = getCaseStudyPath(caseStudy.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${caseStudy.client} case study`,
    headline: caseStudy.headline,
    description: caseStudy.seo.description,
    url: toAbsoluteUrl(caseStudyPath),
    about: caseStudy.services,
    genre: caseStudy.category,
    image: caseStudy.media[0]?.src
      ? toAbsoluteUrl(caseStudy.media[0].src)
      : undefined,
    provider: {
      "@type": "Organization",
      name: "Koala Studios",
      url: toAbsoluteUrl("/"),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Work",
          item: toAbsoluteUrl("/work"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: caseStudy.title,
          item: toAbsoluteUrl(caseStudyPath),
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyHero caseStudy={caseStudy} />
      <CaseStudyStory caseStudy={caseStudy} />
      <CaseStudyRelated current={caseStudy} related={related} />
    </>
  );
}
