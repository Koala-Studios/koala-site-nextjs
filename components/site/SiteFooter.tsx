import Image from "next/image";
import Link from "next/link";

import { navigationContent, siteSettings } from "@/lib/content";

import { ArrowIcon } from "./ArrowIcon";
import { Marquee } from "./Marquee";
import styles from "./SiteFooter.module.css";

const serviceLinks = [
  { label: "Shopify design & build", href: "/services/shopify-design-and-build" },
  { label: "Meta ad management", href: "/services/meta-ads-management" },
  { label: "Email marketing", href: "/services/email-marketing" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Link
        className={styles.marqueeLink}
        href={navigationContent.featuredCta.href}
        aria-label="Start a project"
      >
        <Marquee className={styles.marquee} duration={18}>
          {Array.from({ length: 6 }).map((_, index) => (
            <span className={styles.marqueeItem} key={index}>
              Start a project
              <ArrowIcon className={styles.marqueeArrow} />
            </span>
          ))}
        </Marquee>
      </Link>

      <div className={styles.frame}>
        <div className={styles.columns}>
          <div className={styles.brandColumn}>
            <Image
              className={styles.logo}
              src="/images/koala_logo_white.png"
              alt="Koala Studios"
              width={134}
              height={25}
            />
            <p className={styles.statement}>{siteSettings.description}</p>
            <a
              className={`${styles.email} koala-underline-link`}
              href="mailto:hello@koalastudios.ca"
            >
              hello@koalastudios.ca
            </a>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <p className={styles.columnTitle}>Site</p>
            {navigationContent.footer.map((item) => (
              <Link
                className="koala-underline-link"
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.column}>
            <p className={styles.columnTitle}>Services</p>
            {serviceLinks.map((service) => (
              <Link
                className="koala-underline-link"
                key={service.href}
                href={service.href}
              >
                {service.label}
              </Link>
            ))}
          </div>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          Koala Studios
        </p>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {siteSettings.name} &mdash;
            Toronto, Canada
          </p>
          <div className={styles.bottomLinks}>
            <Link className="koala-underline-link" href="/privacy">
              Privacy
            </Link>
            <p className={styles.copyright}>
              Designed and built by Koala &mdash; like everything we ship.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
