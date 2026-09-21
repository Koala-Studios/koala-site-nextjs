import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createNoIndexMetadata } from "@/lib/metadata";
import styles from "./review.module.css";

export const metadata = createNoIndexMetadata({ title: "Maya flyer proofs | Private review" });

export default function FlyerReview() {
  if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW !== "true") notFound();
  return (
    <div className="koala-page">
      <p className="koala-eyebrow">Private review</p>
      <h1 className="koala-page-title">Maya flyer proofs</h1>
      <p>Two-sided, 4 × 6 inches. The seated portrait is provisional. Both editions use the same back and QR code.</p>
      <p>The QR points to mayaamani.com. Its redirect has not been changed. These are review exports; confirm the final portrait and printer profile before printing.</p>
      <Link className="koala-underline-link" href="/maya">Back to Maya&apos;s page</Link>
      <div className={styles.proofs}>
        {[
          { title: "Evergreen front", image: "evergreen-1.png", edition: "evergreen" },
          { title: "CHFA front", image: "chfa-1.png", edition: "chfa" },
          { title: "Shared back", image: "evergreen-2.png", edition: null },
        ].map((proof) => (
          <section key={proof.image}>
            <h2>{proof.title}</h2>
            <Image src={`/maya/flyers/file/${proof.image}`} alt={proof.title} width={1000} height={1500} unoptimized priority />
            {proof.edition && <div className={styles.links}>
              <a href={`/maya/flyers/file/maya-${proof.edition}-screen.pdf`} target="_blank" rel="noreferrer">Two-page screen PDF ↗</a>
              <a href={`/maya/flyers/file/maya-${proof.edition}-print.pdf`} target="_blank" rel="noreferrer">CMYK PDF with bleed and marks ↗</a>
            </div>}
          </section>
        ))}
      </div>
    </div>
  );
}
