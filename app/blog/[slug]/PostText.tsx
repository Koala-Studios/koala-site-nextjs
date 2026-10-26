import Link from "next/link";
import type { ReactNode } from "react";

import type { BlogInline, BlogParagraph } from "@/lib/content";

function renderRun(run: BlogInline, index: number): ReactNode {
  if (typeof run === "string") return run;

  let node: ReactNode = run.text;
  if (run.em) node = <em>{node}</em>;
  if (run.strong) node = <strong>{node}</strong>;
  if (run.href) {
    node = run.href.startsWith("#") ? (
      <a href={run.href}>{node}</a>
    ) : run.href.startsWith("/") ? (
      <Link href={run.href}>{node}</Link>
    ) : (
      <a href={run.href} rel="noopener noreferrer" target="_blank">
        {node}
      </a>
    );
  }

  return <span key={index}>{node}</span>;
}

/** One post paragraph, with its bold, italic and linked runs. */
export function PostParagraph({ paragraph, className }: { paragraph: BlogParagraph; className?: string }) {
  return <p className={className}>{typeof paragraph === "string" ? paragraph : paragraph.map(renderRun)}</p>;
}
