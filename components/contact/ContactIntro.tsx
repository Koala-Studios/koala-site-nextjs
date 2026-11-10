"use client";

import { useSearchParams } from "next/navigation";

import { Cta } from "@/components/site/Cta";
import { Arch } from "@/components/system";
import { Icon } from "@/components/system/Icons";
import { auditOffer } from "@/lib/content/audit";
import { mayaCall, mayaContent } from "@/lib/content/maya";

import styles from "./ContactIntro.module.css";

/** Left column of both contact pages; visitors from Maya's page see who replies. */
export function ContactIntro() {
  const params = useSearchParams();
  const interest = params.get("interest");
  return (
    <ContactIntroView
      fromMaya={params.get("source") === "maya"}
      isAudit={interest === "brand-growth-audit"}
      isCall={interest === mayaCall.interest}
    />
  );
}

/** Static render used as the server fallback, so the headline is always in the HTML. */
export function ContactIntroView({
  fromMaya = false,
  isAudit = false,
  isCall = false,
}: {
  fromMaya?: boolean;
  isAudit?: boolean;
  isCall?: boolean;
}) {
  const email = fromMaya || isCall ? mayaContent.email : "hello@koalastudios.ca";

  return (
    <div className={styles.intro}>
      <h1 className={`ks-x ${styles.title}`} id="contact-title">
        {isCall ? (
          <>
            Book a <em>call.</em>
          </>
        ) : isAudit ? (
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
        {isCall
          ? mayaCall.formIntro
          : isAudit
            ? auditOffer.summary
            : "Tell us what you’re selling and where you want it to go. A real person reads every note and replies within two business days."}
      </p>

      {fromMaya || isCall ? (
        <div className={styles.person}>
          <Arch className={styles.personArch} src={mayaContent.portrait} alt="" sizes="96px" position="center 18%" />
          <div>
            <span className="ks-label ks-muted">You’ll hear from</span>
            <span className={`ks-x ${styles.personName}`}>{mayaContent.name}</span>
            <span className="ks-it">{mayaContent.title}</span>
          </div>
        </div>
      ) : (
        <div className={styles.maya}>
          <Arch className={styles.mayaArch} src={mayaContent.portrait} alt={`${mayaContent.name}, ${mayaContent.title}`} sizes="120px" position="center 18%" />
          <div className={styles.mayaBody}>
            <span className={`ks-x ${styles.personName}`}>{mayaContent.name}</span>
            <span className="ks-it">{mayaContent.title}</span>
            <a className={`ks-tlink ${styles.mayaMail}`} href={`mailto:${mayaContent.email}`} data-contact-method="email">
              {mayaContent.email}
            </a>
          </div>
          <Cta className={styles.mayaCta} href={mayaCall.href} data-analytics-cta="contact-maya-call">
            {mayaCall.label}
          </Cta>
        </div>
      )}

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
