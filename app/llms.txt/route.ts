import { serviceDetails } from "@/content/pages/service-details";
import { servicesContent } from "@/content/pages/services";
import { getPublishedBlogPosts, getPublishedCaseStudies, siteSettings } from "@/lib/content";
import { asoPage } from "@/lib/content/aso";
import { auditOffer } from "@/lib/content/audit";
import { mayaContent } from "@/lib/content/maya";
import { getBlogPostPath, getCaseStudyPath, toAbsoluteUrl } from "@/lib/routes";

/** /llms.txt (llmstxt.org): who we are and where the facts live, built from the same content as the pages. */
export const dynamic = "force-static";

function link(title: string, path: string, note?: string) {
  return `- [${title}](${toAbsoluteUrl(path)})${note ? `: ${note}` : ""}`;
}

export function GET() {
  const plans = servicesContent.plans;
  const lines = [
    `# ${siteSettings.name}`,
    "",
    `> ${siteSettings.description} We design and build Shopify stores, run Meta ads and Klaviyo email, and make packaging and 3D product renders, for brands across Canada and the United States.`,
    "",
    `- Location: Toronto, Ontario, Canada`,
    `- Email: hello@koalastudios.ca`,
    `- Consulting: ${mayaContent.name}, ${mayaContent.title} (${mayaContent.email})`,
    ...Object.values(siteSettings.social)
      .filter(Boolean)
      .map((url) => `- Profile: ${url}`),
    "",
    "## Services",
    "",
    ...serviceDetails.map((service) => link(service.navLabel, `/services/${service.slug}`, service.seoDescription)),
    link(asoPage.navLabel, asoPage.path, "Fixing the Shopify product information that ChatGPT, Gemini and Copilot read."),
    link(`Consulting with ${mayaContent.name}`, "/maya", mayaContent.intro),
    link(auditOffer.title, auditOffer.href, auditOffer.summary),
    "",
    "## Plans and prices",
    "",
    ...plans.items.map(
      (plan) => `- ${plan.name}: ${"was" in plan && plan.was ? `normally ${plan.was}, ` : ""}${plan.price} ${plan.unit}. ${plan.copy}`,
    ),
    "",
    plans.note,
    "",
    "## Questions",
    "",
    ...servicesContent.faq.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
    "## Work",
    "",
    ...getPublishedCaseStudies().map((caseStudy) =>
      link(
        `${caseStudy.client} (${caseStudy.channels ? `${caseStudy.sector}, ${caseStudy.channels}` : caseStudy.sector})`,
        getCaseStudyPath(caseStudy.slug),
        caseStudy.results?.length
          ? `${caseStudy.headline} ${caseStudy.results.map((result) => `${result.value}: ${result.label}.`).join(" ")}`
          : caseStudy.headline,
      ),
    ),
    "",
    "## Journal",
    "",
    ...getPublishedBlogPosts().map((post) => link(post.title + (post.titleAccent ? ` ${post.titleAccent}` : ""), getBlogPostPath(post.slug))),
    "",
    "## Optional",
    "",
    link("All work", "/work"),
    link("Services overview", "/services"),
    link("Contact", "/contact"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
