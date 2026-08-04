import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";
import { corePublicRoutes } from "@/lib/routes";

import styles from "./newton.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Koala Studios Newton",
  description:
    "How Koala Studios uses Newton to securely manage authorized client Google Ads accounts.",
  path: corePublicRoutes.newton,
});

const capabilities = [
  "Campaign research, keyword planning, and forecasting",
  "Search, Standard Shopping, and retail Performance Max management",
  "Campaign performance, search-term, asset, and conversion reporting",
  "Reviewed campaign creation and changes for authorized client accounts",
];

export default function NewtonPage() {
  return (
    <div className={`koala-page ${styles.page}`}>
      <section className={styles.hero}>
        <p className="koala-eyebrow">Internal marketing technology</p>
        <h1>Koala Studios Newton</h1>
        <p className={styles.lede}>
          Newton is Koala Studios&apos; private internal tool for managing Google
          Ads work on behalf of clients who have authorized our agency to access
          their advertising accounts.
        </p>
      </section>

      <section className={styles.details} aria-labelledby="purpose-heading">
        <div className={styles.statement}>
          <h2 id="purpose-heading">What Newton does</h2>
          <p>
            Our team uses Newton to research campaigns, plan keywords, create
            and manage approved advertising, and report on performance. It
            connects only to registered Google Ads accounts managed by Koala
            Studios and does not provide public or client self-service access.
          </p>
        </div>

        <ul className={styles.capabilities}>
          {capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </section>

      <section className={styles.safeguards} aria-labelledby="safeguards-heading">
        <h2 id="safeguards-heading">Access and safeguards</h2>
        <div className={styles.safeguardGrid}>
          <p>
            Newton is available only to authenticated Koala Studios personnel
            and approved internal workers.
          </p>
          <p>
            Provider credentials remain in private server-side storage and are
            never exposed to operators or clients.
          </p>
          <p>
            Campaigns are created paused, creative is reviewed, and live changes
            require an exact internal approval.
          </p>
        </div>
      </section>

      <section className={styles.contact}>
        <p>
          Questions about Newton or Google account access can be sent to{" "}
          <a href="mailto:access@koalastudios.ca">access@koalastudios.ca</a>.
        </p>
        <Link href={corePublicRoutes.privacy}>Privacy policy</Link>
      </section>
    </div>
  );
}
