import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Footer.module.css";
import Button from "../Button";

interface Props {
  hideContactUs?: boolean;
}

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className={styles.footer_container}>
      {props.hideContactUs ? (
        ""
      ) : (
        <div className={styles.contact_us}>
          <div>
            <h2>Have a project for us?</h2>
            <p>
              We help amazing companies succeed and flourish in the digital age.
            </p>
          </div>
          <Link to="/contact">
            <Button type="primary light">Contact Us</Button>
          </Link>
        </div>
      )}
      <div>
        <div className={styles.footer_info_container}>
          <div className={styles.footer_info}>
            <img
              alt="Koala Studios Logo"
              src="/images/koala_logo_white.png"
              width={106}
              height={20}
            />
            <hr></hr>
            <p>
              By leveraging our strategy, design, and technology capabilities,
              we deliver game-changing outcomes for our clients around the
              world.
            </p>
          </div>

          <div className={styles.links_section}>
            <div>
              <h3>Links</h3>
              <hr></hr>
            </div>
            <Link to="/projects">View Our Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div>
        <p style={{ textAlign: "center", fontSize: "0.8rem" }}>
          © 2023 Koala Studios. All Rights Reserved.
        </p>
        {/* TODO:ADD SOCIAL MEDIA LINKS */}
      </div>
      <div className="footer_meta"></div>
    </footer>
  );
};

export default Footer;
