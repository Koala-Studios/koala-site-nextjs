import Image from "next/image";
import Link from "next/link";

import { navigationContent, siteSettings } from "@/lib/content";

import { Cta } from "./Cta";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <div className={styles.top}>
          <div>
            <Image
              className={styles.logo}
              src="/images/koala_logo_black.png"
              alt="Koala Studios"
              width={134}
              height={25}
            />
            <p className={styles.statement}>{siteSettings.description}</p>
          </div>

          <Cta href={navigationContent.featuredCta.href} size="small" variant="outlined">
            {navigationContent.featuredCta.label}
          </Cta>
        </div>

        <div className={styles.bottom}>
          <nav className={styles.nav} aria-label="Footer">
            {navigationContent.footer.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {siteSettings.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
