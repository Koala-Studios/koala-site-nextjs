"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/system";
import { serviceDetails } from "@/content/pages/service-details";
import { caseStudies, leadCaseStudySlug, navigationContent } from "@/lib/content";
import { getPageContext } from "@/lib/content/page-context";
import { getCaseStudyPath } from "@/lib/routes";

import { ArrowIcon } from "./ArrowIcon";
import { Cta } from "./Cta";
import styles from "./SiteHeader.module.css";

const menuNotes: Record<string, string> = {
  "/work": "Selected brands",
  "/services": "What we do",
  "/contact": "Say hello",
};

const serviceNotes: Record<string, string> = {
  "shopify-design-and-build": "Stores built to convert",
  "meta-ads-management": "Creative-first paid social",
  "email-marketing": "Flows that bring buyers back",
  "packaging-and-3d-renders": "Shelf-ready, render-ready",
};

const featured = caseStudies.find((caseStudy) => caseStudy.slug === leadCaseStudySlug && caseStudy.status === "published");

function isActivePath(currentPath: string, href: string): boolean {
  return href === "/" ? currentPath === href : currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const context = getPageContext(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const [lastPathname, setLastPathname] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close overlays when the route changes (adjust-state-during-render pattern).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // On the homepage the wordmark starts as the masthead and shrinks into the
  // centre of the nav as the page scrolls; everywhere else it sits in the nav.
  useEffect(() => {
    const barElement = barRef.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bar = barRef.current;
      const space = isHome ? document.querySelector<HTMLElement>(".ks-masthead-space") : null;
      if (!bar || !space) return;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const slotWidth = parseFloat(getComputedStyle(bar).getPropertyValue("--ks-slot-w")) * rem;
      const slotTop = (bar.offsetHeight - slotWidth * (479 / 1600)) / 2;
      const rect = space.getBoundingClientRect();
      // Travel from the masthead to the nav over the masthead's own height.
      const distance = Math.max(1, rect.top + window.scrollY - slotTop + rect.height);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      bar.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      barElement?.style.removeProperty("--p");
    };
  }, [isHome]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const overlay = document.getElementById("menu-overlay");
      const toggle = document.querySelector<HTMLElement>("button[aria-controls='menu-overlay']");
      if (!overlay) return;
      const focusables = [...(toggle ? [toggle] : []), ...overlay.querySelectorAll<HTMLElement>("a[href], button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !focusables.includes(active!))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 160);
  };
  const hrefFor = (href: string) => (href === "/contact" ? context.contactHref : href);

  return (
    <>
      <div
        ref={barRef}
        className={[styles.bar, isHome ? styles.barHome : "", menuOpen ? styles.barMenu : "", servicesOpen ? styles.barDocked : ""].join(" ")}
      >
        <header className={styles.header}>
          <Link className={styles.brand} data-brand href="/" aria-label="Koala Studios home" onClick={() => setMenuOpen(false)}>
            <Logo label="" />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            {navigationContent.primary.map((item) => {
              const className = `ks-label ${styles.link} ${isActivePath(pathname, item.href) ? styles.linkActive : ""}`;
              if (item.href !== "/services") {
                return (
                  <Link className={className} href={hrefFor(item.href)} key={item.href}>
                    {item.label}
                  </Link>
                );
              }
              return (
                <div className={styles.navItem} key={item.href} onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                  <Link className={className} href={item.href} aria-expanded={servicesOpen} onFocus={openServices} onClick={() => setServicesOpen(false)}>
                    {item.label}
                  </Link>
                  <div className={`${styles.dropdown} ${servicesOpen ? styles.dropdownOpen : ""}`} onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                    <div className={styles.dropdownInner}>
                      {serviceDetails.map((service, index) => (
                        <Link className={styles.dropdownLink} href={`/services/${service.slug}`} key={service.slug} onClick={() => setServicesOpen(false)} onBlur={scheduleClose} onFocus={openServices}>
                          <span className="ks-label">{String(index + 1).padStart(2, "0")}</span>
                          <span className="ks-x">{service.navLabel}</span>
                          <span className="ks-it">{serviceNotes[service.slug]}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className={styles.right}>
          <Link className={`ks-label ${styles.action}`} href={context.ctaHref} data-analytics-cta="header">
            <span>{context.ctaLabel}</span>
            <ArrowIcon className={styles.actionArrow} />
          </Link>

          <button
            className={`ks-label ${styles.menuButton}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-overlay"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className={styles.menuWord}>{menuOpen ? "Close" : "Menu"}</span>
            <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`} aria-hidden="true" />
          </button>
          </div>
        </header>
      </div>

      <div id="menu-overlay" className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`} aria-hidden={!menuOpen}>
        <nav className={styles.overlayNav} aria-label="Menu">
          {navigationContent.primary.map((item, index) => (
            <Link
              key={item.href}
              className={`${styles.overlayLink} ${isActivePath(pathname, item.href) ? styles.overlayLinkActive : ""}`}
              href={hrefFor(item.href)}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${80 + index * 60}ms` : "0ms" }}
            >
              <span className="ks-x">{item.label}</span>
              <span className="ks-it">{menuNotes[item.href] ?? ""}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.overlayFooter}>
          {featured?.coverImage ? (
            <Link className={styles.latest} href={getCaseStudyPath(featured.slug)} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
              <span className={`ks-arch ${styles.latestArch}`}>
                <Image src={featured.coverImage.src} alt="" fill sizes="80px" />
              </span>
              <span>
                <span className="ks-label">Featured work</span>
                <span className={`ks-it ${styles.latestName}`}>{featured.client}</span>
              </span>
            </Link>
          ) : null}
          <Cta href={context.ctaHref} variant="light" fullWidth data-analytics-cta="menu" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
            {context.ctaLabel}
          </Cta>
          <a className={`ks-label ${styles.overlayEmail}`} href={`mailto:${context.email}`} tabIndex={menuOpen ? 0 : -1}>
            {context.email} · Toronto
          </a>
        </div>
      </div>
    </>
  );
}
