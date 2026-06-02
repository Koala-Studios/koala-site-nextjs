"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navigationContent } from "@/lib/content";

import { ArrowIcon } from "./ArrowIcon";
import styles from "./SiteHeader.module.css";

function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/") {
    return currentPath === href;
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.headerWrap}>
      <header className={styles.header}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Koala Studios home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/koala_logo_black.png"
            alt=""
            width={134}
            height={25}
            priority
          />
        </Link>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Primary"
        >
          {navigationContent.primary.map((item) => (
            <Link
              key={item.href}
              className={`${styles.link} ${
                isActivePath(pathname, item.href) ? styles.linkActive : ""
              }`}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          className={`${styles.arrowLink} ${styles.desktopAction}`}
          href={navigationContent.featuredCta.href}
        >
          <span>{navigationContent.featuredCta.label}</span>
          <ArrowIcon />
        </Link>

        <button
          className={`${styles.menuButton} ${menuOpen ? styles.menuOpen : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
    </div>
  );
}
