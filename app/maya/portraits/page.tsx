import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mayaPortraits } from "@/lib/content/maya";
import { createNoIndexMetadata } from "@/lib/metadata";
import styles from "../maya.module.css";

export const metadata = createNoIndexMetadata({ title: "Maya portrait options | Local review" });

export default function PortraitReview() {
  if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW !== "true") notFound();
  return <div className="koala-page"><p className="koala-eyebrow">Local review only</p><h1 className="koala-page-title">Maya portrait options</h1><p>Four options for review. The seated taupe portrait is used provisionally on the page.</p><Link className="koala-underline-link" href="/maya">Back to Maya&apos;s page</Link><div className={styles.gallery}>{mayaPortraits.map((portrait) => <figure key={portrait.file}><a href={`/images/maya/${portrait.file}.webp`} target="_blank" rel="noreferrer"><Image src={`/images/maya/${portrait.file}.webp`} alt={portrait.description} width={941} height={1672} sizes="(max-width: 480px) 100vw, (max-width: 1000px) 50vw, 25vw" /></a><figcaption><h2>{portrait.label}</h2><p>{portrait.description}</p></figcaption></figure>)}</div></div>;
}
