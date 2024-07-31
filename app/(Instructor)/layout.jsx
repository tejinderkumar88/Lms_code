import Head from "next/head";
import React from "react";

import "bootstrap/dist/css/bootstrap.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../index.css";

import "bootstrap/dist/css/bootstrap.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../styles/custom.css";
import InstructorSidebar from "@/components/Common/InstructorSidebar";

const layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-xrNa+hdC7Bl1+7b0IiJU8+VDDikDj6mD9Hzf8gPXtZ9R9tj0v9OOnTtJLqKmkOfY1PAdg1L7I9uKIx0VHXn3XQ=="
          crossorigin="anonymous"
        />
      </Head>
      <div>
        <InstructorSidebar />
       {children}
      </div>
    </>
  );
};

export default layout;
