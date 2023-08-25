'use client'

import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Button from "./Button";
// import { useAuth } from "../../contexts/Authcontext";
import { MainContext } from "./ContextContainer";
import Link from "next/link";

const isMobile = (): boolean => {
  //TO BE REMOVED FROM THIS PAGE
  if (typeof window == "undefined") return false;

  return window.innerHeight > window.innerWidth ? true : false;
};

interface Props {
  navbarFull?: boolean;
}

const Navbar: React.FC<Props> = (props) => {
  // const user = useAuth();

  // const mainContext = useContext(MainContext);

  const [menuLinkActive, setMenuLinkActive] = useState(false);

  // useEffect(() => {
  //   // TODO:Add checks to improve performance
  //   console.log(props.navbarFull);
  //   if (props.navbarFull == false) {
  //     document.addEventListener("scroll", () => {
  //       if (window.scrollY > 200) {
  //         mainContext.SetContext({ navbarTransparent: false });
  //       } else {
  //         mainContext.SetContext({ navbarTransparent: true });
  //       }
  //     });
  //   }
  // }, []);

  return (
    <nav className={styles.navbar}>
      <Link
        onClick={() => setMenuLinkActive(false)}
        className={styles.logo}
        href="/"
      >
        <img
          alt="Koala Studios Logo"
          src="/images/koala_logo_white.png"
          width={134}
          height={25}
        />
      </Link>

      <div className={`${styles.links_container} ${
          menuLinkActive ? styles.active : ""
        }`}>
        <Link href="/projects" onClick={() => setMenuLinkActive(false)}>Our Work</Link>
        <Link href="/services" onClick={() => setMenuLinkActive(false)}>Services</Link>
        <Link href="/about" onClick={() => setMenuLinkActive(false)}>About Us</Link>
        <Link href="/blogs" onClick={() => setMenuLinkActive(false)}>Blogs</Link>
        
        <Link className={styles.contact_mobile} href="/contact" onClick={() => setMenuLinkActive(false)}>
          Contact Us
        </Link>
        {/* 
        <Link
          onClick={() => setMenuLinkActive(false)}
          href="/contact"
          className={styles.mobile_contact}
        >
          Contact Us
        </Link> */}

        {/* <Link href="/dashboard">
          <a className={styles.mobile_dashboard}>Dashboard</a>
        </Link> */}
      </div>
      <div className={styles.links_container_buttons}>
        <a href="/contact">
          <Button type="primary light">Contact Us</Button>
        </a>
        {/* <Link href={user.currentUser ? "/dashboard" : "signin"}>
          <a>
            <Button type="secondary light">
              Dashboard
              <Image
                alt="leaf icon"
                src="/icons/leaf_icon.png"
                height={15}
                width={15}
              />
            </Button>
          </a>
        </Link> */}
      </div>

      <div 
        onClick={() => {
          setMenuLinkActive(!menuLinkActive);
        }}
        className={`${styles.links_menu_item} ${
          menuLinkActive ? styles.active : ""
        }`}
        >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
