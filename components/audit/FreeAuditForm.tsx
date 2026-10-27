"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { Field, Input } from "@/components/forms";
import { Cta } from "@/components/site/Cta";
import { analyticsConfig } from "@/lib/analytics";
import { attributionEventParams, attributionFields, captureAttribution } from "@/lib/attribution";
import { freeAuditPage } from "@/lib/content/audit";
import { markPendingContactSubmit, trackEvent } from "@/lib/gtag";

import styles from "./FreeAuditForm.module.css";

const NETLIFY_FORM_ENDPOINT = "/__forms.html";
export const FREE_AUDIT_FORM_NAME = "free-audit";

/** "acme.com" and "www.acme.com/shop" become full URLs; anything else is left as typed. */
function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) || !trimmed.includes(".") ? trimmed : `https://${trimmed}`;
}

/** Email, company and website only. Netlify Forms stores it and emails the team. */
export function FreeAuditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");

  useEffect(() => {
    const id = window.setTimeout(() => setAttribution(attributionFields(captureAttribution())), 0);
    return () => window.clearTimeout(id);
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");
    trackEvent({ action: analyticsConfig.ctaEventName, category: "audit", label: "free audit submit" });

    try {
      const current = captureAttribution();
      const formData = new FormData(event.currentTarget);
      formData.set("website", normalizeWebsite(String(formData.get("website") ?? "")));
      Object.entries(attributionFields(current)).forEach(([key, value]) => formData.set(key, value));
      if (process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true") {
        // An explicit local-only build never posts requests to the live service.
        window.sessionStorage.setItem("koala:preview-submission", JSON.stringify(Object.fromEntries(formData)));
        router.push("/free-audit/thanks");
        return;
      }
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        if (typeof value === "string") body.append(key, value);
      });
      const response = await fetch(NETLIFY_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Netlify form submission failed.");
      markPendingContactSubmit(attributionEventParams(current));
      router.push("/free-audit/thanks");
    } catch {
      setState("error");
    }
  };

  return (
    <form
      action={NETLIFY_FORM_ENDPOINT}
      className={styles.form}
      method="POST"
      name={FREE_AUDIT_FORM_NAME}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={FREE_AUDIT_FORM_NAME} />
      {Object.entries(attribution).map(([key, value]) => (
        <input type="hidden" key={key} name={key} value={value} />
      ))}
      <p className={styles.hidden}>
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
        </label>
      </p>
      {process.env.NEXT_PUBLIC_LOCAL_PREVIEW === "true" ? (
        <p className={styles.preview}>Local preview: requests stay in this browser and are not sent.</p>
      ) : null}
      <Field label="Email">
        <Input name="email" type="email" autoComplete="email" inputMode="email" required />
      </Field>
      <Field label="Company">
        <Input name="company" autoComplete="organization" required />
      </Field>
      <Field label="Website">
        <Input name="website" type="text" autoComplete="url" inputMode="url" placeholder="yourstore.com" required />
      </Field>
      <Cta type="submit" fullWidth disabled={state === "submitting"}>
        {state === "submitting" ? "Sending" : freeAuditPage.submitLabel}
      </Cta>
      {state === "error" ? (
        <p className={styles.error} role="alert">
          The form did not send. Email your website to hello@koalastudios.ca instead.
        </p>
      ) : null}
    </form>
  );
}
