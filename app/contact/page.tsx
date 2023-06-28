import styles from "../../styles/ContactPage.module.css";

export default function Page() {
  return (
    <div className={styles.form_container}>
      <div className={styles.contact_title}>
        <h1>Let&apos;s Work Together!</h1>
        <p>
          Connect with our team regarding an upcoming project or transformation
          need.
        </p>
      </div>

      <form
        className={styles.form}
        // action="https://getform.io/f/5e593f69-858c-4bd1-add7-d080a2080075"
        data-netlify="true"
        method="POST"
      >
        <div className={styles.form_texts}>
          <label>
            Name
            <input type="text" name="name" />
          </label>
          <label>
            Company Name
            <input type="text" name="company_name" required />
          </label>
          <label>
            Email Address
            <input type="email" name="email" required />
          </label>
          <label>
            Phone
            <input type="phone" name="phone" required />
          </label>
        </div>

        <label>
          Message
          <textarea className={styles.message} name="message" required />
        </label>
        <button className={styles.send_button} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
