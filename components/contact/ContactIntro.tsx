"use client";

import { useSearchParams } from "next/navigation";

import { Arch } from "@/components/system";
import { Icon } from "@/components/system/Icons";
import { auditOffer } from "@/lib/content/audit";
import { mayaContent } from "@/lib/content/maya";

import styles from "./ContactIntro.module.css";

/** Left column of both contact pages; visitors from Maya's page see who replies. */
export function ContactIntro() {
  const params = useSearchParams();
  return <ContactIntroView fromMaya={params.get("source") === "maya"} isAudit={params.get("interest") === "brand-growth-audit"} />;
}

/** Static render used as the server fallback, so the headline is always in the HTML. */
export function ContactIntroView({ fromMaya = false, isAudit = false }: { fromMaya?: boolean; isAudit?: boolean }) {
  const email = fromMaya ? mayaContent.email : "hello@koalastudios.ca";

  return (
    <div className={styles.intro}>
      <h1 className={`ks-x ${styles.title}`} id="contact-title">
        {isAudit ? (
          <>
            Your free <em>audit.</em>
          </>
        ) : (
          <>
            Let’s talk <em>shop.</em>
          </>
        )}
      </h1>
      <p className="ks-lede">
        {isAudit ? auditOffer.summary : "Tell us what you’re selling and where you want it to go. A real person reads every note and replies within two business days."}
      </p>

      {fromMaya ? (
        <div className={styles.person}>
          <Arch className={styles.personArch} src={mayaContent.portrait} alt="" sizes="96px" position="center 18%" />
          <div>
            <span className="ks-label ks-muted">You’ll hear from</span>
            <span className={`ks-x ${styles.personName}`}>{mayaContent.name}</span>
            <span className="ks-it">{mayaContent.title}</span>
          </div>
        </div>
      ) : null}

      <div className={styles.direct}>
        <span className="ks-label ks-muted">Or write directly</span>
        <a className={`ks-tlink ${styles.mail}`} href={`mailto:${email}`} data-contact-method="email">
          <Icon name="mail" size={20} />
          {email}
        </a>
      </div>
    </div>
  );
}
