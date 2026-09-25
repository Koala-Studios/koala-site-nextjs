"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationContent, siteSettings } from "@/lib/content";

import { auditOffer } from "@/lib/content/audit";

import { MayaServiceIcons } from "./MayaServiceIcons";

import { ArrowIcon } from "./ArrowIcon";
import { Marquee } from "./Marquee";
import styles from "./SiteFooter.module.css";

const serviceLinks = [
  {
    label: "Shopify design & build",
    href: "/services/shopify-design-and-build",
  },
  { label: "Meta ad management", href: "/services/meta-ads-management" },
  { label: "Email marketing", href: "/services/email-marketing" },
  {
    label: "Packaging & 3D renders",
    href: "/services/packaging-and-3d-renders",
  },
];

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer className={`${styles.footer} ${pathname === "/maya" ? styles.mayaFooter : ""}`}>
      <Link
        className={styles.marqueeLink}
        href={pathname === "/maya" ? auditOffer.mayaHref : navigationContent.featuredCta.href}
        aria-label="Start a project"
        data-analytics-cta="footer-marquee"
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
        {pathname === "/maya" && <MayaServiceIcons />}
        <div className={styles.columns}>
          <div className={styles.brandColumn}>
            {pathname === "/maya" ? <Image className={styles.logo} src="/images/koala-studios-custom-v3.png" alt="Koala Studios" width={1773} height={531} /> : <Image
              className={styles.logo}
              src="/images/koala_logo_white.png"
              alt="Koala Studios"
              width={134}
              height={25}
            />}
            <p className={styles.statement}>{siteSettings.description}</p>
            <a
              className={`${styles.email} koala-underline-link`}
              href={pathname === "/maya" ? "mailto:maya@koalastudios.ca" : "mailto:hello@koalastudios.ca"}
            >
              {pathname === "/maya" ? "maya@koalastudios.ca" : "hello@koalastudios.ca"}
            </a>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <p className={styles.columnTitle}>Site</p>
            {navigationContent.footer.map((item) => (
              <Link
                className="koala-underline-link"
                key={item.href}
                href={pathname === "/maya" && item.href === "/contact" ? auditOffer.mayaHref : item.href}
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

        {/* <p className={styles.wordmark} aria-hidden="true">
          Koala Studios
        </p> */}

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {siteSettings.name} &middot;
            Toronto, Canada
          </p>
          <div className={styles.bottomLinks}>
            <Link className="koala-underline-link" href="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
