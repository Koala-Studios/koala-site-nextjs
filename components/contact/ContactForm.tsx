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

import styles from "./ContactForm.module.css";

const NETLIFY_FORM_ENDPOINT = "/__forms.html";

const projectTypes = [
  { value: "Shopify design & build", name: "interest-shopify" },
  { value: "Meta ads", name: "interest-meta-ads" },
  { value: "Email marketing", name: "interest-email" },
  { value: "Brand and growth audit", name: "interest-audit" },
  { value: "Not sure yet", name: "interest-unsure" },
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
  const auditRef = useRef<HTMLInputElement>(null);
  const isAudit = searchParams.get("interest") === "brand-growth-audit";
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  useEffect(() => {
    if (isAudit && auditRef.current) auditRef.current.checked = true;
  }, [isAudit]);
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
                  ref={type.name === "interest-audit" ? auditRef : undefined}
                  defaultChecked={type.name === "interest-audit" && isAudit}
                />
                <span className={styles.typeLabel}>{type.value}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field label="Budget (optional)">
          <select
            name="budget"
            aria-label="Budget"
            className={styles.select}
            defaultValue=""
          >
            <option value="">Select a range</option>
            <option value="Under $5k">Under $5k</option>
            <option value="$5k - $15k">$5k &ndash; $15k</option>
            <option value="$15k - $50k">$15k &ndash; $50k</option>
            <option value="$50k+">$50k+</option>
            <option value="Ongoing retainer">Ongoing retainer</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>

        <Field label="Project details">
          <Textarea
            name="message"
            aria-label="Project details"
            required
          />
        </Field>

        </>}

        <div className={styles.footer}>
          <Cta type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Sending" : short && isAudit ? "Request the audit" : "Send message"}
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
