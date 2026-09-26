"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/system";
import { serviceDetails } from "@/content/pages/service-details";
import { navigationContent, siteSettings } from "@/lib/content";
import { getPageContext } from "@/lib/content/page-context";

import { Cta } from "./Cta";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const context = getPageContext(usePathname());

  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        {context.footerLead ? (
          <div className={styles.lead}>
            <h2 className={`ks-x ${styles.title}`}>
              Let’s build something <em>that sells.</em>
            </h2>
            <div className={styles.leadAction}>
              <p className={styles.statement}>{siteSettings.description}</p>
              <Cta href={context.ctaHref} variant="light" data-analytics-cta="footer">
                {context.ctaLabel}
              </Cta>
            </div>
          </div>
        ) : null}

        <div className={`${styles.columns} ${context.footerLead ? "" : styles.columnsFirst}`}>
          <nav aria-label="Footer">
            <p className="ks-label">Site</p>
            {navigationContent.footer.map((item) => (
              <Link className="koala-underline-link" key={item.href} href={item.href === "/contact" ? context.contactHref : item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div>
            <p className="ks-label">Services</p>
            {serviceDetails.map((service) => (
              <Link className="koala-underline-link" key={service.slug} href={`/services/${service.slug}`}>
                {service.navLabel}
              </Link>
            ))}
          </div>
          <div>
            <p className="ks-label">Studio</p>
            <a className="koala-underline-link" href={`mailto:${context.email}`} data-contact-method="email">
              {context.email}
            </a>
            <span>Canada</span>
          </div>
        </div>

        <Logo className={styles.masthead} />

        <div className={`ks-label ${styles.bottom}`}>
          <span>
            © {new Date().getFullYear()} {siteSettings.name}
          </span>
          <Link className="koala-underline-link" href="/privacy">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
