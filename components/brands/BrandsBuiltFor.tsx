import Image from "next/image";

import { Marquee } from "@/components/site/Marquee";
import { getBrandsBuiltFor } from "@/lib/content";

import styles from "./BrandsBuiltFor.module.css";

export function BrandsBuiltFor() {
  const brands = getBrandsBuiltFor();

  return (
    <section className={styles.section} aria-label="Brands we've built for">
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
                src={`/images/brands/light/${brand.slug}.png`}
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
