"use client";

import { Field, Input, Textarea } from "@/components/forms";
import { Cta } from "@/components/site/Cta";
import { analyticsConfig } from "@/lib/analytics";
import { markPendingContactSubmit, trackEvent } from "@/lib/gtag";

import styles from "./ContactForm.module.css";

const controlWidth = { width: "100%" } as const;
const netlifyFormAttributes = {
  "data-netlify": "true",
  "netlify-honeypot": "bot-field",
} as const;

export function ContactForm() {
  const handleSubmit = () => {
    markPendingContactSubmit();
    trackEvent({
      action: analyticsConfig.ctaEventName,
      category: "contact",
      label: "contact form submit",
    });
  };

  return (
    <div className={styles.formBlock}>
      <form
        className={styles.form}
        name="contact"
        method="POST"
        action="/contact/success"
        onSubmit={handleSubmit}
        {...netlifyFormAttributes}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className={styles.hidden}>
          <label>
            Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
          </label>
        </p>

        <div className={styles.row}>
          <Field label="Name">
            <Input
              name="name"
              aria-label="Name"
              autoComplete="name"
              required
              style={controlWidth}
            />
          </Field>
          <Field label="Company">
            <Input
              name="company"
              aria-label="Company"
              autoComplete="organization"
              required
              style={controlWidth}
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
              style={controlWidth}
            />
          </Field>
          <Field label="Phone">
            <Input
              name="phone"
              type="tel"
              aria-label="Phone"
              autoComplete="tel"
              style={controlWidth}
            />
          </Field>
        </div>

        <Field label="Project details">
          <Textarea
            name="message"
            aria-label="Project details"
            required
            style={{ ...controlWidth, minHeight: "10rem" }}
          />
        </Field>

        <div className={styles.footer}>
          <Cta type="submit" variant="full">
            Send message
          </Cta>
        </div>
      </form>
    </div>
  );
}
