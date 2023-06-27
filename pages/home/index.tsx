import React from "react";
import type { NextPage } from "next";
import Link from "next/link";

const about: NextPage = () => {
  return (
    <div>
      <Link href="projects">go to projects</Link>
      Helloo home
    </div>
  );
};

export default about;
