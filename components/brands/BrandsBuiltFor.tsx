import Image from "next/image";

import { Marquee } from "@/components/site/Marquee";
import { AmbientAccent } from "@/components/three/AmbientAccent";
import { getBrandsBuiltFor } from "@/lib/content";

import styles from "./BrandsBuiltFor.module.css";

export function BrandsBuiltFor() {
  const brands = getBrandsBuiltFor();

  return (
    <section className={styles.section} aria-labelledby="brands-built-for-title">
      <AmbientAccent
        className={styles.accent}
        shape="icosphere"
        side="right"
        parallax={4}
      />
      <p
        className={`koala-eyebrow ${styles.eyebrow}`}
        id="brands-built-for-title"
      >
        Brands we&apos;ve built for
      </p>
      <Marquee className={styles.marquee} duration={38}>
        {brands.map((brand) => (
          <span
            className={styles.mark}
            data-brand={brand.slug}
            key={brand.slug}
          >
            {brand.logo ? (
              <Image
                className={styles.logo}
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={brand.logo.width ?? 220}
                height={brand.logo.height ?? 80}
                loading="eager"
                sizes="(max-width: 540px) 34vw, 12rem"
              />
            ) : (
              <span className={styles.wordmark}>{brand.client}</span>
            )}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
