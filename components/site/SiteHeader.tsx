"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { serviceDetails } from "@/content/pages/service-details";
import { navigationContent } from "@/lib/content";

import { ArrowIcon } from "./ArrowIcon";
import { Cta } from "./Cta";
import styles from "./SiteHeader.module.css";

const serviceNavDescriptions: Record<string, string> = {
  "shopify-design-and-build":
    "Storefront design and custom theme development built around your product story and made to convert.",
  "meta-ads-management":
    "Creative-first Facebook and Instagram campaigns that bring predictable, scalable traffic to your store.",
  "email-marketing":
    "Klaviyo flows and campaigns that turn one-time buyers into repeat customers on autopilot.",
  "packaging-and-3d-renders":
    "Label and packaging design plus photoreal 3D product renders that win the shelf and lift your store.",
};

function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/") {
    return currentPath === href;
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    servicesCloseTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };

  // Close overlays when the route changes (adjust-state-during-render pattern).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      // Trap Tab inside the open overlay (plus the toggle button).
      if (event.key === "Tab") {
        const overlay = document.getElementById("menu-overlay");
        const toggle = document.querySelector<HTMLElement>(
          "button[aria-controls='menu-overlay']"
        );

        if (!overlay) {
          return;
        }

        const focusables = [
          ...(toggle ? [toggle] : []),
          ...overlay.querySelectorAll<HTMLElement>("a[href], button"),
        ];

        if (!focusables.length) {
          return;
        }

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
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <div className={`${styles.headerWrap} ${servicesOpen ? styles.headerWrapSolid : ""}`}>
        <header className={styles.header}>
        <Link
          className={styles.brand}
          href="/"
          aria-label="Koala Studios home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/koala_logo_white.png"
            alt=""
            width={134}
            height={25}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {navigationContent.primary.map((item) => {
            const linkClassName = `${styles.link} ${
              isActivePath(pathname, item.href) ? styles.linkActive : ""
            }`;

            if (item.href !== "/services") {
              return (
                <Link className={linkClassName} href={item.href} key={item.href}>
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                className={styles.navItem}
                key={item.href}
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <Link
                  className={linkClassName}
                  href={item.href}
                  onClick={() => setServicesOpen(false)}
                >
                  {item.label}
                </Link>
                <div
                  className={`${styles.dropdown} ${servicesOpen ? styles.dropdownOpen : ""}`}
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  <div className={styles.dropdownInner}>
                    {serviceDetails.map((service) => (
                      <Link
                        className={styles.dropdownLink}
                        href={`/services/${service.slug}`}
                        key={service.slug}
                        onClick={() => setServicesOpen(false)}
                      >
                        <span className={styles.dropdownLabel}>
                          {service.navLabel}
                        </span>
                        <span className={styles.dropdownDesc}>
                          {serviceNavDescriptions[service.slug]}
                        </span>
                        <span className={styles.dropdownLearn}>
                          Learn more
                          <ArrowIcon className={styles.dropdownArrow} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <Cta
          className={styles.desktopAction}
          data-analytics-cta="header"
          href={navigationContent.featuredCta.href}
          icon="circle"
          iconPosition="left"
          size="medium"
          variant="transparent"
        >
          {navigationContent.featuredCta.label}
        </Cta>

        <button
          className={`${styles.menuButton} ${menuOpen ? styles.menuOpen : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="menu-overlay"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        </header>
      </div>

      <div
        id="menu-overlay"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className={styles.overlayNav} aria-label="Menu">
          {navigationContent.primary.map((item, index) => (
            <Link
              key={item.href}
              className={`${styles.overlayLink} ${
                isActivePath(pathname, item.href) ? styles.overlayLinkActive : ""
              }`}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.overlayIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.overlayMask}>
                <span
                  className={styles.overlayLabel}
                  style={{ transitionDelay: menuOpen ? `${120 + index * 70}ms` : "0ms" }}
                >
                  {item.label}
                </span>
              </span>
            </Link>
          ))}
        </nav>

        <div className={styles.overlayFooter}>
          <a
            className={`${styles.overlayEmail} koala-underline-link`}
            href="mailto:hello@koalastudios.ca"
            tabIndex={menuOpen ? 0 : -1}
          >
            hello@koalastudios.ca
          </a>
          <Cta
            href={navigationContent.featuredCta.href}
            data-analytics-cta="menu"
            icon="circle"
            iconPosition="left"
            size="medium"
            variant="transparent"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            {navigationContent.featuredCta.label}
          </Cta>
        </div>
      </div>
    </>
  );
}
