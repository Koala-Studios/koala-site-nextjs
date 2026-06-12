"use client";

import { Field, Input, Textarea } from "@/components/forms";
import { Cta } from "@/components/site/Cta";
import { Magnetic } from "@/components/site/Magnetic";
import { analyticsConfig } from "@/lib/analytics";
import { markPendingContactSubmit, trackEvent } from "@/lib/gtag";

import styles from "./ContactForm.module.css";

const controlWidth = { width: "100%" } as const;
const netlifyFormAttributes = {
  "data-netlify": "true",
  "netlify-honeypot": "bot-field",
} as const;

const projectTypes = [
  { value: "Shopify design & build", name: "interest-shopify" },
  { value: "Meta ads", name: "interest-meta-ads" },
  { value: "Email marketing", name: "interest-email" },
  { value: "Not sure yet", name: "interest-unsure" },
] as const;

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
            style={{ ...controlWidth, minHeight: "10rem" }}
          />
        </Field>

        <div className={styles.footer}>
          <Magnetic>
            <Cta type="submit" variant="full">
              Send message
            </Cta>
          </Magnetic>
        </div>
      </form>
    </div>
  );
}
