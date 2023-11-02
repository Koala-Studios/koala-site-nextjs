import Footer from "@/components/sections/Footer";
import styles from "../../../styles/ContactPage.module.css";
import Link from "next/link";
import Button from "@/components/Button";

export default function Page() {
  return (
    <>
      <div
        style={{ justifyContent: "center" }}
        className={styles.form_container}
      >
        <div className={styles.contact_title}>
          <h1>Thank You for your Message!</h1>
          <p>
            We will get back to you within 48 hours to discuss your business
            needs.
          </p>
          <Link style={{ display: "flex", justifyContent: "center" }} href="/">
            <Button type="primary light" classes={styles.contact_btn}>
              Back to Site
            </Button>
          </Link>
        </div>
      </div>
      <Footer hideContactUs />
    </>
  );
}
