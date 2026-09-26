import Image from "next/image";
import Link from "next/link";
import type { ElementType, ReactNode } from "react";

import { MetricValue } from "@/components/animation/MetricValue";

/* ---------- Logo ---------- */
export function Logo({ className, label = "Koala Studios" }: { className?: string; label?: string }) {
  const classes = ["ks-logo", className].filter(Boolean).join(" ");
  return label ? <span className={classes} role="img" aria-label={label} /> : <span className={classes} aria-hidden="true" />;
}

/* ---------- Folio: the magazine running line ---------- */
export function Folio({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <div className={["ks-folio ks-label", className].filter(Boolean).join(" ")}>
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
}

/* ---------- Section head: rule, optional index, title, optional aside ---------- */
type SectionHeadProps = {
  index?: string;
  title: ReactNode;
  id?: string;
  aside?: ReactNode;
  as?: ElementType;
  className?: string;
};

export function SectionHead({ index, title, id, aside, as: Tag = "h2", className }: SectionHeadProps) {
  return (
    <div className={["ks-section-head", index ? "" : "ks-section-head--bare", className].filter(Boolean).join(" ")}>
      {index ? <span className="ks-label">{index}</span> : null}
      <Tag className="ks-x ks-h2" id={id}>
        {title}
      </Tag>
      {aside ? <div>{aside}</div> : null}
    </div>
  );
}

/* ---------- Arch image ---------- */
type ArchProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  position?: string;
};

export function Arch({ src, alt, sizes, className, priority, position }: ArchProps) {
  return (
    <div className={["ks-arch", className].filter(Boolean).join(" ")}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}

/* ---------- Index list: the shared row for work, services and menus ---------- */
export type IndexItem = {
  key: string;
  name: ReactNode;
  meta?: ReactNode;
  href?: string;
  lead?: ReactNode;
  thumb?: { src: string; alt: string };
};

export function IndexList({ items, className }: { items: IndexItem[]; className?: string }) {
  return (
    <div className={["ks-index", className].filter(Boolean).join(" ")}>
      {items.map((item) => {
        const inner = (
          <>
            {item.thumb ? (
              <Arch className="ks-arch--thumb" src={item.thumb.src} alt={item.thumb.alt} sizes="48px" />
            ) : (
              <span className="ks-label">{item.lead}</span>
            )}
            <span className="ks-x ks-index__name">{item.name}</span>
            {item.meta ? <span className="ks-index__meta">{item.meta}</span> : <span />}
          </>
        );

        return item.href ? (
          <Link className="ks-index__row" href={item.href} key={item.key}>
            {inner}
          </Link>
        ) : (
          <div className="ks-index__row" key={item.key}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Stat rows ---------- */
export type StatItem = { value: string; label: string; source?: string };

export function StatRows({ items, className }: { items: StatItem[]; className?: string }) {
  return (
    <dl className={["ks-stats", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <div className="ks-stats__row" key={`${item.value}-${item.label}`}>
          <dt className="ks-num ks-stats__value">
            <MetricValue value={item.value} />
          </dt>
          <dd className="ks-stats__label">
            {item.label}
            {item.source ? <em>{item.source}</em> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
