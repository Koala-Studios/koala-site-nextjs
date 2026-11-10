"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { Field, Input, Textarea } from "@/components/forms";
import { Cta } from "@/components/site/Cta";
import { analyticsConfig } from "@/lib/analytics";
import { markPendingContactSubmit, trackEvent } from "@/lib/gtag";
import { attributionEventParams, attributionFields, captureAttribution } from "@/lib/attribution";
import { auditOffer } from "@/lib/content/audit";
import { mayaCall } from "@/lib/content/maya";

import styles from "./ContactForm.module.css";

const NETLIFY_FORM_ENDPOINT = "/__forms.html";

// `interest` query values that tick a box on arrival, e.g. /contact?interest=seo.
const projectTypes = [
  { value: "Shopify store", name: "interest-shopify", query: "shopify" },
  { value: "Ads & ad creative", name: "interest-meta-ads", query: "ads" },
  { value: "Email marketing", name: "interest-email", query: "email" },
  { value: "SEO & Google Maps", name: "interest-seo", query: "seo" },
  { value: "AI shopping (ChatGPT & co.)", name: "interest-ai-shopping", query: "ai-shopping" },
  { value: "Free website audit", name: "interest-audit", query: "brand-growth-audit" },
  { value: "Not sure yet", name: "interest-unsure", query: "unsure" },
] as const;

function encodeFormData(formData: FormData) {
  const encoded = new URLSearchParams();

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      encoded.append(key, value);
    }
  });

  return encoded.toString();
}

export function ContactForm({ short = false }: { short?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const interest = searchParams.get("interest");
  const isAudit = interest === "brand-growth-audit";
  const isCall = interest === mayaCall.interest;
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  useEffect(() => {
    const match = projectTypes.find((type) => type.query === interest);
    const box = match ? formRef.current?.querySelector<HTMLInputElement>(`input[name="${match.name}"]`) : null;
    if (box) box.checked = true;
  }, [interest]);
  useEffect(() => {
    const id = window.setTimeout(() => setAttribution(attributionFields(captureAttribution())), 0);
    return () => window.clearTimeout(id);
  }, [searchParams]);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "error"
  >("idle");
  const isSubmitting = submitState === "submitting";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    trackEvent({
      action: analyticsConfig.ctaEventName,
      category: "contact",
      label: "contact form submit",
    });

    try {
      const current = captureAttribution();
      const formData = new FormData(event.currentTarget);
      Object.entries(attributionFields(current)).forEach(([key, value]) => formData.set(key, value));
      if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true") {
        // An explicit local-only build never posts inquiries to the live service.
        window.sessionStorage.setItem("koala:preview-submission", JSON.stringify(Object.fromEntries(formData)));
        router.push("/contact/success");
        return;
      }
      const response = await fetch(NETLIFY_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(formData),
      });

      if (!response.ok) {
        throw new Error("Netlify form submission failed.");
      }

      markPendingContactSubmit(attributionEventParams(current));
      router.push("/contact/success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className={styles.formBlock}>
      {isAudit && !short && <div className={styles.auditNote}><span className="ks-label">{auditOffer.title}</span><p>{auditOffer.summary}</p></div>}
      {process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true" && <p className={styles.previewNote}>Local preview: submissions stay in this browser and are not sent.</p>}
      <form
        className={styles.form}
        name="contact"
        method="POST"
        ref={formRef}
        action={NETLIFY_FORM_ENDPOINT}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        {Object.entries(attribution).map(([key, value]) => <input type="hidden" key={key} name={key} value={value} />)}
        <p className={styles.hidden}>
          <label>
            Don&apos;t fill this out if you&apos;re human:{" "}
            <input name="bot-field" />
          </label>
        </p>

        {short ? <>
          <div className={styles.row}>
            <Field label="Name"><Input name="name" aria-label="Name" autoComplete="name" required /></Field>
            <Field label="Email"><Input name="email" type="email" aria-label="Email" autoComplete="email" required /></Field>
          </div>
          <div className={styles.row}>
            <Field label="Company"><Input name="company" aria-label="Company" autoComplete="organization" required /></Field>
            <Field label="Website (optional)"><Input name="website" type="text" aria-label="Website (optional)" autoComplete="url" /></Field>
          </div>
          {isAudit && <input type="hidden" name="interest-audit" value="Brand and growth audit" />}
          {isCall && <input type="hidden" name="interest-call" value={mayaCall.formValue} />}
        </> : <>
        <div className={styles.row}>
          <Field label="Name">
            <Input
              name="name"
              aria-label="Name"
              autoComplete="name"
              required
             
            />
          </Field>
          <Field label="Company">
            <Input
              name="company"
              aria-label="Company"
              autoComplete="organization"
              required
             
            />
          </Field>
        </div>

        <div className={styles.row}>
          <Field label="Email">
            <Input
              name="email"
              type="email"
              aria-label="Email"
              autoComplete="email"
              required
             
            />
          </Field>
          <Field label="Phone">
            <Input
              name="phone"
              type="tel"
              aria-label="Phone"
              autoComplete="tel"
             
            />
          </Field>
        </div>

        <Field label="Website URL">
          <Input name="website" type="text" aria-label="Website URL" autoComplete="url" required />
        </Field>

        <fieldset className={styles.typeFieldset}>
          <legend className={styles.typeLegend}>What do you need?</legend>
          <div className={styles.typeChips}>
            {projectTypes.map((type) => (
              <label className={styles.typeChip} key={type.name}>
                <input
                  className={styles.typeInput}
                  name={type.name}
                  type="checkbox"
                  value={type.value}
                  defaultChecked={type.query === interest}
                />
                <span className={styles.typeLabel}>{type.value}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Anything we should know? (optional)">
          <Textarea
            name="message"
            aria-label="Anything we should know"
          />
        </Field>

        </>}

        <div className={styles.footer}>
          <Cta type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Sending" : short && isCall ? "Ask for a call" : short && isAudit ? "Request the audit" : "Send message"}
          </Cta>
          {submitState === "error" ? (
            <p className={styles.status} role="alert">
              The form did not send. Email hello@koalastudios.ca instead.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
